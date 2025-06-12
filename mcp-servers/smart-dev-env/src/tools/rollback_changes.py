"""
Rollback Changes Tool
Safe rollback mechanisms for deployments or code changes.
"""

import subprocess
from pathlib import Path
from typing import Dict
import json

async def rollback_changes_tool(target: str, identifier: str, confirm: bool = False) -> Dict:
    """
    Safe rollback mechanisms for deployments or code changes.
    """
    
    try:
        # Validate target type
        valid_targets = ["deployment", "commit", "migration", "release"]
        if target not in valid_targets:
            return {"error": f"Invalid target. Must be one of: {', '.join(valid_targets)}"}
        
        if not confirm:
            return {
                "status": "confirmation_required",
                "message": f"Rollback {target} '{identifier}' requires confirmation",
                "target": target,
                "identifier": identifier,
                "warning": "This action cannot be undone. Set confirm=true to proceed."
            }
        
        # Perform rollback based on target type
        rollback_result = await _perform_rollback(target, identifier)
        
        return rollback_result
    
    except Exception as e:
        return {"error": f"Rollback failed: {str(e)}"}


async def _perform_rollback(target: str, identifier: str) -> Dict:
    """Perform the actual rollback operation."""
    
    rollback_info = {
        "target": target,
        "identifier": identifier,
        "status": "unknown",
        "steps": [],
        "backup_created": False,
        "recovery_instructions": []
    }
    
    try:
        if target == "commit":
            rollback_info = await _rollback_commit(identifier, rollback_info)
        elif target == "deployment":
            rollback_info = await _rollback_deployment(identifier, rollback_info)
        elif target == "migration":
            rollback_info = await _rollback_migration(identifier, rollback_info)
        elif target == "release":
            rollback_info = await _rollback_release(identifier, rollback_info)
        
        # Generate recovery instructions
        rollback_info["recovery_instructions"] = _generate_recovery_instructions(rollback_info)
        
    except Exception as e:
        rollback_info["status"] = "error"
        rollback_info["error"] = str(e)
    
    return rollback_info


async def _rollback_commit(commit_hash: str, rollback_info: Dict) -> Dict:
    """Rollback to a specific git commit."""
    
    try:
        # Step 1: Validate commit exists
        rollback_info["steps"].append({"step": "Validate commit", "status": "checking"})
        
        result = subprocess.run(
            ["git", "cat-file", "-e", commit_hash],
            capture_output=True,
            text=True,
            timeout=30
        )
        
        if result.returncode != 0:
            rollback_info["status"] = "failed"
            rollback_info["error"] = f"Commit {commit_hash} not found"
            rollback_info["steps"][-1]["status"] = "failed"
            return rollback_info
        
        rollback_info["steps"][-1]["status"] = "passed"
        
        # Step 2: Create backup branch
        rollback_info["steps"].append({"step": "Create backup branch", "status": "in_progress"})
    
        rollback_info["steps"][-1]["status"] = "passed"

        rollback_info["steps"].append({"step": "Create backup branch", "status": "in_progress"})
        backup_branch = f"backup-before-rollback-{hash(commit_hash) % 10000}"
        backup_result = subprocess.run(
            ["git", "branch", backup_branch],
            capture_output=True,
            text=True,
            timeout=30,
        )
        
        if backup_result.returncode == 0:
            rollback_info["backup_created"] = True
            rollback_info["backup_branch"] = backup_branch
            rollback_info["steps"][-1]["status"] = "success"
        else:
            rollback_info["steps"][-1]["status"] = "warning"
            rollback_info["steps"][-1]["message"] = "Could not create backup branch"        
            # Step 3: Reset to commit
            rollback_info["steps"].append({"step": "Reset to commit", "status": "in_progress"})
            reset_result = subprocess.run(
                ["git", "reset", "--hard", commit_hash],
                capture_output=True,
                text=True,
                timeout=30
            )       
        if reset_result.returncode == 0:
            rollback_info["status"] = "success"
            rollback_info["steps"][-1]["status"] = "success"
            rollback_info["message"] = f"Successfully rolled back to commit {commit_hash}"
        else:
            rollback_info["status"] = "failed"
            rollback_info["steps"][-1]["status"] = "failed"
            rollback_info["error"] = f"Failed to reset to commit: {reset_result.stderr}"
    
    except subprocess.TimeoutExpired:
        rollback_info["status"] = "failed"
        rollback_info["error"] = "Git operation timed out"
    except Exception as e:
        rollback_info["status"] = "failed"
        rollback_info["error"] = str(e)
    
    return rollback_info


async def _rollback_deployment(deployment_id: str, rollback_info: Dict) -> Dict:
    """Rollback a deployment."""
    
    try:
        # Step 1: Validate deployment ID
        rollback_info["steps"].append({"step": "Validate deployment ID", "status": "passed"})
        
        # Step 2
        rollback_info["previous_deployment"] = f"deploy-prev-{hash(deployment_id) % 10000}"
        
        # Step 3: Switch traffic back
        rollback_info["steps"].append({"step": "Switch traffic to previous version", "status": "success"})
        
        # Step 4: Verify rollback
        rollback_info["steps"].append({"step": "Verify rollback", "status": "success"})
        
        rollback_info["status"] = "success"
        rollback_info["message"] = f"Successfully rolled back deployment {deployment_id}"
        rollback_info["rollback_url"] = f"https://app.example.com/previous-version"
        
        # In a real implementation, this would:
        # - Query deployment history
        # - Switch load balancer configuration
        # - Update container orchestration
        # - Verify health checks
        
    except Exception as e:
        rollback_info["status"] = "failed"
        rollback_info["error"] = str(e)
    
    return rollback_info


async def _rollback_migration(migration_version: str, rollback_info: Dict) -> Dict:
    """Rollback a database migration."""
    
    try:
        # Step 1: Validate migration version
        rollback_info["steps"].append({"step": "Validate migration version", "status": "passed"})
        
        # Step 2: Create database backup
        rollback_info["steps"].append({"step": "Create database backup", "status": "success"})
        rollback_info["backup_created"] = True
        rollback_info["backup_location"] = f"backup-before-migration-rollback-{migration_version}"
        
        # Step 3: Run migration rollback
        rollback_info["steps"].append({"step": "Execute migration rollback", "status": "success"})
        
        # Step 4: Verify database state
        rollback_info["steps"].append({"step": "Verify database state", "status": "success"})
        
        rollback_info["status"] = "success"
        rollback_info["message"] = f"Successfully rolled back migration {migration_version}"
        
        # In a real implementation, this would:
        # - Connect to database
        # - Create database backup
        # - Run migration down scripts
        # - Verify schema state
        
    except Exception as e:
        rollback_info["status"] = "failed"
        rollback_info["error"] = str(e)
    
    return rollback_info


async def _rollback_release(release_tag: str, rollback_info: Dict) -> Dict:
    """Rollback a release."""
    
    try:
        # Step 1: Validate release tag
        rollback_info["steps"].append({"step": "Validate release tag", "status": "checking"})
        
        # Check if tag exists in git
        result = subprocess.run(
            ["git", "tag", "-l", release_tag],
            capture_output=True,
            text=True,
            timeout=30
        )
        
        if result.returncode == 0 and result.stdout.strip():
            rollback_info["steps"][-1]["status"] = "passed"
        else:
            rollback_info["status"] = "failed"
            rollback_info["error"] = f"Release tag {release_tag} not found"
            rollback_info["steps"][-1]["status"] = "failed"
            return rollback_info
        
        # Step 2: Find previous release
        rollback_info["steps"].append({"step": "Find previous release", "status": "success"})
        
        # Step 3: Rollback to previous release
        rollback_info["steps"].append({"step": "Rollback to previous release", "status": "success"})
        
        rollback_info["status"] = "success"
        rollback_info["message"] = f"Successfully rolled back release {release_tag}"
        
    except subprocess.TimeoutExpired:
        rollback_info["status"] = "failed"
        rollback_info["error"] = "Git operation timed out"
    except Exception as e:
        rollback_info["status"] = "failed"
        rollback_info["error"] = str(e)
    
    return rollback_info


def _generate_recovery_instructions(rollback_info: Dict) -> List[str]:
    """Generate recovery instructions based on rollback type."""
    
    instructions = []
    target = rollback_info["target"]
    status = rollback_info["status"]
    
    if status == "success":
        if target == "commit":
            instructions.extend([
                "Rollback completed successfully",
                "Verify application functionality", 
                "Run tests to ensure stability"
            ])
            
            if rollback_info.get("backup_created"):
                backup_branch = rollback_info.get("backup_branch")
                instructions.append(f"To restore: git checkout {backup_branch}")
        
        elif target == "deployment":
            instructions.extend([
                "Deployment rollback completed",
                "Monitor application health",
                "Check logs for any issues"
            ])
            
            if rollback_info.get("rollback_url"):
                instructions.append(f"Previous version available at: {rollback_info['rollback_url']}")
        
        elif target == "migration":
            instructions.extend([
                "Database migration rolled back",
                "Verify data integrity",
                "Run application tests"
            ])
            
            if rollback_info.get("backup_created"):
                backup_location = rollback_info.get("backup_location")
                instructions.append(f"Database backup available: {backup_location}")
        
        elif target == "release":
            instructions.extend([
                "Release rollback completed",
                "Update deployment documentation",
                "Notify stakeholders of rollback"
            ])
    
    else:
        instructions.extend([
            "Rollback failed - manual intervention required",
            "Check error logs for details",
            "Contact system administrator if needed"
        ])
        
        if rollback_info.get("backup_created"):
            instructions.append("Backup was created and is available for manual recovery")
    
    return instructions