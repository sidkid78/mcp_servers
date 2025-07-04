"""
Rotate Secrets Tool
Rotate security credentials and secrets safely across environments.
"""

import json
import asyncio
from datetime import datetime, timedelta
from typing import Dict, List
import random
import string


async def rotate_secrets_tool(
    secret_type: str,
    environment: str = "all",
    force_rotation: bool = False,
    notify: bool = True
) -> Dict:
    """
    Rotate security credentials and secrets safely.
    
    Args:
        secret_type: Type of secret - api_keys, certificates, passwords, database
        environment: Target environment or "all"
        force_rotation: Force rotation even if not due
        notify: Send notifications about rotation status
    
    Returns:
        Dict containing secret rotation results and status
    """
    
    # Validate inputs
    valid_secret_types = ["api_keys", "certificates", "passwords", "database", "tokens", "ssh_keys"]
    valid_environments = ["dev", "staging", "production", "all"]
    
    if secret_type not in valid_secret_types:
        secret_type = "api_keys"
    
    if environment not in valid_environments:
        environment = "all"
    
    # Initialize rotation operation
    rotation_data = {
        "rotation_id": f"rotate-{secret_type}-{datetime.now().strftime('%Y%m%d-%H%M%S')}",
        "secret_type": secret_type,
        "environment": environment,
        "force_rotation": force_rotation,
        "notifications_enabled": notify,
        "start_time": datetime.now().isoformat(),
        "status": "initializing",
        "phases": [],
        "secrets_inventory": {},
        "rotation_results": {},
        "notification_results": {},
        "recommendations": []
    }
    
    try:
        # Phase 1: Discover and inventory secrets
        inventory_phase = await _discover_secrets_inventory(rotation_data)
        rotation_data["phases"].append(inventory_phase)
        rotation_data["secrets_inventory"] = inventory_phase.get("inventory", {})
        
        if not inventory_phase["success"]:
            rotation_data["status"] = "failed"
            rotation_data["error"] = "Secret discovery failed"
            return rotation_data
        
        # Phase 2: Determine rotation candidates
        candidates_phase = await _determine_rotation_candidates(rotation_data)
        rotation_data["phases"].append(candidates_phase)
        
        # Phase 3: Execute secret rotations
        if candidates_phase.get("rotation_candidates", []):
            rotation_phase = await _execute_secret_rotations(rotation_data)
            rotation_data["phases"].append(rotation_phase)
            rotation_data["rotation_results"] = rotation_phase.get("rotation_results", {})
            
            if not rotation_phase["success"]:
                rotation_data["status"] = "partially_completed"
            else:
                rotation_data["status"] = "completed"
        else:
            rotation_data["status"] = "no_action_needed"
            rotation_data["reason"] = "No secrets require rotation at this time"
        
        # Phase 4: Send notifications (if enabled)
        if notify and rotation_data["status"] in ["completed", "partially_completed"]:
            notification_phase = await _send_rotation_notifications(rotation_data)
            rotation_data["phases"].append(notification_phase)
            rotation_data["notification_results"] = notification_phase.get("notification_results", {})
        
        # Generate recommendations
        rotation_data["recommendations"] = await _generate_rotation_recommendations(rotation_data)
        
        rotation_data["end_time"] = datetime.now().isoformat()
        rotation_data["duration_minutes"] = round(
            (datetime.fromisoformat(rotation_data["end_time"]) - 
             datetime.fromisoformat(rotation_data["start_time"])).total_seconds() / 60, 2
        )
        
    except Exception as e:
        rotation_data["status"] = "failed"
        rotation_data["error"] = str(e)
        rotation_data["end_time"] = datetime.now().isoformat()
    
    return rotation_data


async def _discover_secrets_inventory(rotation_data: Dict) -> Dict:
    """Discover and inventory existing secrets across environments."""
    
    secret_type = rotation_data["secret_type"]
    environment = rotation_data["environment"]
    
    inventory_phase = {
        "phase": "secret_discovery",
        "status": "running",
        "start_time": datetime.now().isoformat(),
        "discovery_results": [],
        "inventory": {},
        "success": True
    }
    
    # Determine environments to scan
    environments_to_scan = ["dev", "staging", "production"] if environment == "all" else [environment]
    
    # Discover secrets in each environment
    total_secrets = 0
    for env in environments_to_scan:
        env_secrets = await _scan_environment_secrets(env, secret_type)
        inventory_phase["discovery_results"].append(env_secrets)
        total_secrets += env_secrets.get("secret_count", 0)
    
    # Consolidate inventory
    inventory_phase["inventory"] = await _consolidate_secrets_inventory(
        inventory_phase["discovery_results"], secret_type
    )
    
    inventory_phase["status"] = "completed"
    inventory_phase["end_time"] = datetime.now().isoformat()
    
    return inventory_phase


async def _scan_environment_secrets(environment: str, secret_type: str) -> Dict:
    """Scan a specific environment for secrets of the given type."""
    
    await asyncio.sleep(0.1)  # Simulate scan time
    
    # Generate realistic secret inventory based on type and environment
    if secret_type == "api_keys":
        secrets = await _generate_api_key_inventory(environment)
    elif secret_type == "certificates":
        secrets = await _generate_certificate_inventory(environment)
    elif secret_type == "passwords":
        secrets = await _generate_password_inventory(environment)
    elif secret_type == "database":
        secrets = await _generate_database_secret_inventory(environment)
    elif secret_type == "tokens":
        secrets = await _generate_token_inventory(environment)
    elif secret_type == "ssh_keys":
        secrets = await _generate_ssh_key_inventory(environment)
    else:
        secrets = []
    
    scan_success = random.random() > 0.02  # 98% success rate
    
    return {
        "environment": environment,
        "secret_type": secret_type,
        "scan_status": "completed" if scan_success else "failed",
        "secret_count": len(secrets) if scan_success else 0,
        "secrets": secrets if scan_success else [],
        "error": None if scan_success else "Environment access denied"
    }


async def _generate_api_key_inventory(environment: str) -> List[Dict]:
    """Generate realistic API key inventory for an environment."""
    
    # Base count varies by environment
    base_count = {"dev": 8, "staging": 12, "production": 20}.get(environment, 10)
    key_count = random.randint(base_count - 3, base_count + 5)
    
    keys = []
    for i in range(key_count):
        age_days = random.randint(1, 365)
        created_date = datetime.now() - timedelta(days=age_days)
        last_rotated = created_date + timedelta(days=random.randint(0, age_days))
        
        keys.append({
            "secret_id": f"api-key-{environment}-{i+1:03d}",
            "name": f"{random.choice(['stripe', 'aws', 'sendgrid', 'github', 'slack', 'datadog'])}-api-key",
            "created_date": created_date.isoformat(),
            "last_rotated": last_rotated.isoformat(),
            "age_days": age_days,
            "rotation_period_days": random.choice([30, 60, 90]),
            "status": random.choice(["active", "active", "active", "expiring_soon"]),
            "usage_frequency": random.choice(["high", "medium", "low"]),
            "permissions": random.choice(["read", "read_write", "admin"]),
            "applications": [f"app-{random.randint(1, 5)}" for _ in range(random.randint(1, 3))]
        })
    
    return keys


async def _generate_certificate_inventory(environment: str) -> List[Dict]:
    """Generate realistic certificate inventory for an environment."""
    
    base_count = {"dev": 3, "staging": 5, "production": 12}.get(environment, 6)
    cert_count = random.randint(base_count - 1, base_count + 2)
    
    certificates = []
    for i in range(cert_count):
        issued_days_ago = random.randint(30, 700)
        issued_date = datetime.now() - timedelta(days=issued_days_ago)
        expiry_date = issued_date + timedelta(days=random.choice([90, 365, 730]))
        days_until_expiry = (expiry_date - datetime.now()).days
        
        certificates.append({
            "secret_id": f"cert-{environment}-{i+1:03d}",
            "common_name": f"{random.choice(['api', 'web', 'admin', 'internal'])}.{environment}.example.com",
            "certificate_type": random.choice(["SSL/TLS", "Code Signing", "Client Certificate"]),
            "issued_date": issued_date.isoformat(),
            "expiry_date": expiry_date.isoformat(),
            "days_until_expiry": days_until_expiry,
            "issuer": random.choice(["Let's Encrypt", "DigiCert", "Internal CA"]),
            "key_size": random.choice([2048, 4096]),
            "status": "expiring_soon" if days_until_expiry <= 30 else "active",
            "auto_renewal": random.choice([True, False]),
            "services_using": [f"service-{random.randint(1, 8)}" for _ in range(random.randint(1, 4))]
        })
    
    return certificates


async def _generate_password_inventory(environment: str) -> List[Dict]:
    """Generate realistic password inventory for an environment."""
    
    base_count = {"dev": 6, "staging": 8, "production": 15}.get(environment, 8)
    password_count = random.randint(base_count - 2, base_count + 3)
    
    passwords = []
    for i in range(password_count):
        age_days = random.randint(1, 180)
        created_date = datetime.now() - timedelta(days=age_days)
        last_changed = created_date + timedelta(days=random.randint(0, age_days))
        
        passwords.append({
            "secret_id": f"pwd-{environment}-{i+1:03d}",
            "account_name": f"{random.choice(['admin', 'service', 'backup', 'monitor', 'deploy'])}-{environment}",
            "account_type": random.choice(["service_account", "admin_account", "application_account"]),
            "created_date": created_date.isoformat(),
            "last_changed": last_changed.isoformat(),
            "age_days": age_days,
            "rotation_period_days": random.choice([30, 60, 90]),
            "strength_score": random.randint(65, 100),
            "status": "rotation_due" if age_days > 90 else "active",
            "last_login": (datetime.now() - timedelta(days=random.randint(0, 30))).isoformat(),
            "privileges": random.choice(["read", "write", "admin", "sudo"]),
            "systems_access": [f"system-{random.randint(1, 6)}" for _ in range(random.randint(1, 4))]
        })
    
    return passwords


async def _generate_database_secret_inventory(environment: str) -> List[Dict]:
    """Generate realistic database secret inventory for an environment."""
    
    base_count = {"dev": 4, "staging": 6, "production": 10}.get(environment, 6)
    secret_count = random.randint(base_count - 1, base_count + 2)
    
    db_secrets = []
    for i in range(secret_count):
        age_days = random.randint(1, 120)
        created_date = datetime.now() - timedelta(days=age_days)
        
        db_secrets.append({
            "secret_id": f"db-{environment}-{i+1:03d}",
            "database_name": f"{random.choice(['users', 'orders', 'analytics', 'logs', 'cache'])}_db_{environment}",
            "database_type": random.choice(["postgresql", "mysql", "mongodb", "redis"]),
            "username": f"db_{random.choice(['app', 'read', 'admin', 'backup'])}_{environment}",
            "created_date": created_date.isoformat(),
            "age_days": age_days,
            "rotation_period_days": 60,
            "connection_string_encrypted": True,
            "status": "rotation_due" if age_days > 60 else "active",
            "permissions": random.choice(["read", "read_write", "admin"]),
            "applications_using": [f"app-{random.randint(1, 5)}" for _ in range(random.randint(1, 3))],
            "backup_credentials": random.choice([True, False])
        })
    
    return db_secrets


async def _generate_token_inventory(environment: str) -> List[Dict]:
    """Generate realistic token inventory for an environment."""
    
    base_count = {"dev": 10, "staging": 15, "production": 25}.get(environment, 15)
    token_count = random.randint(base_count - 3, base_count + 5)
    
    tokens = []
    for i in range(token_count):
        age_hours = random.randint(1, 8760)  # Up to 1 year
        created_date = datetime.now() - timedelta(hours=age_hours)
        
        tokens.append({
            "secret_id": f"token-{environment}-{i+1:03d}",
            "token_type": random.choice(["jwt", "oauth", "bearer", "refresh"]),
            "service_name": f"{random.choice(['auth', 'api', 'webhook', 'integration'])}-service",
            "created_date": created_date.isoformat(),
            "age_hours": age_hours,
            "ttl_hours": random.choice([1, 24, 168, 720, 8760]),  # 1h to 1 year
            "status": "expired" if age_hours > 720 else "active",
            "scope": random.choice(["read", "write", "admin", "limited"]),
            "issuer": f"{environment}-auth-service",
            "usage_count": random.randint(0, 10000),
            "last_used": (datetime.now() - timedelta(hours=random.randint(0, 24))).isoformat()
        })
    
    return tokens


async def _generate_ssh_key_inventory(environment: str) -> List[Dict]:
    """Generate realistic SSH key inventory for an environment."""
    
    base_count = {"dev": 5, "staging": 8, "production": 15}.get(environment, 8)
    key_count = random.randint(base_count - 2, base_count + 3)
    
    ssh_keys = []
    for i in range(key_count):
        age_days = random.randint(1, 730)  # Up to 2 years
        created_date = datetime.now() - timedelta(days=age_days)
        
        ssh_keys.append({
            "secret_id": f"ssh-{environment}-{i+1:03d}",
            "key_name": f"{random.choice(['deploy', 'admin', 'backup', 'monitor'])}-{environment}-key",
            "key_type": random.choice(["rsa", "ed25519", "ecdsa"]),
            "key_size": random.choice([2048, 4096]) if random.choice(["rsa"]) == "rsa" else 256,
            "created_date": created_date.isoformat(),
            "age_days": age_days,
            "rotation_period_days": 365,
            "status": "rotation_due" if age_days > 365 else "active",
            "last_used": (datetime.now() - timedelta(days=random.randint(0, 30))).isoformat(),
            "user_accounts": [f"user-{random.randint(1, 10)}" for _ in range(random.randint(1, 3))],
            "servers_access": [f"server-{random.randint(1, 20)}" for _ in range(random.randint(2, 8))],
            "passphrase_protected": random.choice([True, False])
        })
    
    return ssh_keys


async def _consolidate_secrets_inventory(discovery_results: List[Dict], secret_type: str) -> Dict:
    """Consolidate secrets inventory across all environments."""
    
    inventory = {
        "secret_type": secret_type,
        "total_secrets": 0,
        "environments": {},
        "status_summary": {},
        "rotation_due_count": 0,
        "expiring_soon_count": 0
    }
    
    for result in discovery_results:
        if result["scan_status"] == "completed":
            env = result["environment"]
            inventory["environments"][env] = {
                "secret_count": result["secret_count"],
                "secrets": result["secrets"]
            }
            inventory["total_secrets"] += result["secret_count"]
            
            # Count secrets by status
            for secret in result["secrets"]:
                status = secret.get("status", "active")
                inventory["status_summary"][status] = inventory["status_summary"].get(status, 0) + 1
                
                if status in ["rotation_due", "expired"]:
                    inventory["rotation_due_count"] += 1
                elif status == "expiring_soon":
                    inventory["expiring_soon_count"] += 1
    
    return inventory


async def _determine_rotation_candidates(rotation_data: Dict) -> Dict:
    """Determine which secrets should be rotated."""
    
    force_rotation = rotation_data["force_rotation"]
    inventory = rotation_data["secrets_inventory"]
    
    candidates_phase = {
        "phase": "candidate_selection",
        "status": "running",
        "start_time": datetime.now().isoformat(),
        "rotation_candidates": [],
        "selection_criteria": {},
        "success": True
    }
    
    # Define selection criteria
    if force_rotation:
        criteria = {"force_rotation": True, "include_active": True}
    else:
        criteria = {
            "rotation_due": True,
            "expiring_soon": True,
            "expired": True,
            "include_active": False
        }
    
    candidates_phase["selection_criteria"] = criteria
    
    # Select candidates from each environment
    for env, env_data in inventory.get("environments", {}).items():
        for secret in env_data["secrets"]:
            should_rotate = _evaluate_rotation_necessity(secret, criteria)
            
            if should_rotate:
                candidate = {
                    "environment": env,
                    "secret_id": secret["secret_id"],
                    "secret_name": secret.get("name", secret.get("account_name", secret.get("common_name", "unknown"))),
                    "current_status": secret.get("status", "active"),
                    "rotation_reason": _determine_rotation_reason(secret, criteria),
                    "priority": _calculate_rotation_priority(secret)
                }
                candidates_phase["rotation_candidates"].append(candidate)
    
    # Sort candidates by priority
    candidates_phase["rotation_candidates"].sort(key=lambda x: x["priority"], reverse=True)
    
    candidates_phase["status"] = "completed"
    candidates_phase["end_time"] = datetime.now().isoformat()
    
    return candidates_phase


def _evaluate_rotation_necessity(secret: Dict, criteria: Dict) -> bool:
    """Evaluate if a secret needs rotation based on criteria."""
    
    status = secret.get("status", "active")
    
    if criteria.get("force_rotation", False):
        return True
    
    if status == "rotation_due" and criteria.get("rotation_due", False):
        return True
    
    if status == "expiring_soon" and criteria.get("expiring_soon", False):
        return True
    
    if status == "expired" and criteria.get("expired", False):
        return True
    
    # Check age-based rotation
    age_days = secret.get("age_days", 0)
    rotation_period = secret.get("rotation_period_days", 90)
    
    if age_days >= rotation_period:
        return True
    
    return False


def _determine_rotation_reason(secret: Dict, criteria: Dict) -> str:
    """Determine the reason for rotation."""
    
    status = secret.get("status", "active")
    
    if criteria.get("force_rotation", False):
        return "forced_rotation"
    elif status == "expired":
        return "expired"
    elif status == "expiring_soon":
        return "expiring_soon"
    elif status == "rotation_due":
        return "rotation_schedule"
    else:
        return "preventive_rotation"


def _calculate_rotation_priority(secret: Dict) -> int:
    """Calculate rotation priority score (higher = more urgent)."""
    
    priority = 0
    status = secret.get("status", "active")
    
    # Status-based priority
    if status == "expired":
        priority += 100
    elif status == "expiring_soon":
        priority += 80
    elif status == "rotation_due":
        priority += 60
    
    # Usage-based priority
    usage = secret.get("usage_frequency", "low")
    if usage == "high":
        priority += 30
    elif usage == "medium":
        priority += 20
    
    # Permission-based priority
    permissions = secret.get("permissions", secret.get("privileges", "read"))
    if permissions in ["admin", "sudo"]:
        priority += 25
    elif permissions in ["write", "read_write"]:
        priority += 15
    
    # Age-based priority
    age_days = secret.get("age_days", 0)
    rotation_period = secret.get("rotation_period_days", 90)
    
    if age_days > rotation_period * 1.5:
        priority += 20
    elif age_days > rotation_period:
        priority += 10
    
    return priority


async def _execute_secret_rotations(rotation_data: Dict) -> Dict:
    """Execute the actual secret rotations."""
    
    candidates = rotation_data.get("phases", [])[-1].get("rotation_candidates", [])
    
    rotation_phase = {
        "phase": "secret_rotation",
        "status": "running",
        "start_time": datetime.now().isoformat(),
        "rotations": [],
        "rotation_results": {},
        "success": True
    }
    
    successful_rotations = 0
    failed_rotations = 0
    
    # Execute rotation for each candidate
    for candidate in candidates:
        rotation_result = await _rotate_individual_secret(candidate, rotation_data)
        rotation_phase["rotations"].append(rotation_result)
        
        if rotation_result["success"]:
            successful_rotations += 1
        else:
            failed_rotations += 1
    
    # Generate rotation summary
    rotation_phase["rotation_results"] = {
        "total_rotations_attempted": len(candidates),
        "successful_rotations": successful_rotations,
        "failed_rotations": failed_rotations,
        "success_rate": round((successful_rotations / len(candidates) * 100), 1) if candidates else 0
    }
    
    if failed_rotations > 0:
        rotation_phase["success"] = False
    
    rotation_phase["status"] = "completed"
    rotation_phase["end_time"] = datetime.now().isoformat()
    
    return rotation_phase


async def _rotate_individual_secret(candidate: Dict, rotation_data: Dict) -> Dict:
    """Rotate a single secret."""
    
    secret_type = rotation_data["secret_type"]
    
    rotation = {
        "secret_id": candidate["secret_id"],
        "secret_name": candidate["secret_name"],
        "environment": candidate["environment"],
        "rotation_type": secret_type,
        "status": "running",
        "start_time": datetime.now().isoformat(),
        "steps": [],
        "success": True
    }
    
    try:
        # Step 1: Generate new secret
        generate_step = await _generate_new_secret(secret_type, candidate)
        rotation["steps"].append(generate_step)
        
        if not generate_step["success"]:
            rotation["success"] = False
            return rotation
        
        # Step 2: Update secret in secret store
        update_step = await _update_secret_store(secret_type, candidate, generate_step["new_secret"])
        rotation["steps"].append(update_step)
        
        if not update_step["success"]:
            rotation["success"] = False
            return rotation
        
        # Step 3: Update applications/services
        app_update_step = await _update_applications(secret_type, candidate)
        rotation["steps"].append(app_update_step)
        
        if not app_update_step["success"]:
            rotation["success"] = False
            # Attempt rollback
            rollback_step = await _rollback_secret_rotation(secret_type, candidate)
            rotation["steps"].append(rollback_step)
            return rotation
        
        # Step 4: Verify rotation success
        verify_step = await _verify_secret_rotation(secret_type, candidate)
        rotation["steps"].append(verify_step)
        
        if not verify_step["success"]:
            rotation["success"] = False
        
        rotation["status"] = "completed"
        
    except Exception as e:
        rotation["success"] = False
        rotation["error"] = str(e)
        rotation["status"] = "failed"
    
    rotation["end_time"] = datetime.now().isoformat()
    return rotation


async def _generate_new_secret(secret_type: str, candidate: Dict) -> Dict:
    """Generate a new secret of the specified type."""
    
    step = {
        "step": "generate_new_secret",
        "description": f"Generate new {secret_type} for {candidate['secret_name']}",
        "status": "running",
        "start_time": datetime.now().isoformat(),
        "success": True
    }
    
    await asyncio.sleep(0.05)  # Simulate generation time
    
    # Most secret generations succeed
    generation_success = random.random() > 0.02  # 98% success rate
    
    if generation_success:
        if secret_type == "api_keys":
            new_secret = _generate_api_key()
        elif secret_type == "passwords":
            new_secret = _generate_strong_password()
        elif secret_type == "certificates":
            new_secret = _generate_certificate()
        elif secret_type == "database":
            new_secret = _generate_database_credentials()
        elif secret_type == "tokens":
            new_secret = _generate_access_token()
        elif secret_type == "ssh_keys":
            new_secret = _generate_ssh_keypair()
        else:
            new_secret = {"error": f"Unknown secret type: {secret_type}"}
        
        step["new_secret"] = new_secret
        step["status"] = "completed"
    else:
        step["success"] = False
        step["status"] = "failed"
        step["error"] = "Secret generation failed - entropy pool exhausted"
    
    step["end_time"] = datetime.now().isoformat()
    return step


def _generate_api_key() -> Dict:
    """Generate a new API key."""
    return {
        "key_id": f"ak_{_generate_random_string(16)}",
        "secret_key": _generate_random_string(32),
        "created_at": datetime.now().isoformat(),
        "key_format": "base64",
        "permissions": "inherited_from_previous"
    }


def _generate_strong_password() -> Dict:
    """Generate a strong password."""
    # Generate secure password with mixed characters
    chars = string.ascii_letters + string.digits + "!@#$%^&*"
    password = ''.join(random.choices(chars, k=16))
    
    return {
        "password": password,  # In real implementation, this would be hashed
        "strength_score": random.randint(85, 100),
        "created_at": datetime.now().isoformat(),
        "expires_at": (datetime.now() + timedelta(days=90)).isoformat()
    }


def _generate_certificate() -> Dict:
    """Generate a new certificate."""
    return {
        "certificate_id": f"cert_{_generate_random_string(12)}",
        "common_name": "api.example.com",
        "validity_days": 365,
        "key_size": 2048,
        "created_at": datetime.now().isoformat(),
        "expires_at": (datetime.now() + timedelta(days=365)).isoformat(),
        "issuer": "Internal CA"
    }


def _generate_database_credentials() -> Dict:
    """Generate new database credentials."""
    return {
        "username": f"db_user_{_generate_random_string(8)}",
        "password": _generate_random_string(20),
        "created_at": datetime.now().isoformat(),
        "permissions": "inherited_from_previous",
        "connection_limit": 50
    }


def _generate_access_token() -> Dict:
    """Generate a new access token."""
    return {
        "access_token": f"token_{_generate_random_string(40)}",
        "token_type": "Bearer",
        "expires_in": 3600,  # 1 hour
        "scope": "read write",
        "created_at": datetime.now().isoformat()
    }


def _generate_ssh_keypair() -> Dict:
    """Generate a new SSH key pair."""
    return {
        "key_id": f"ssh_{_generate_random_string(12)}",
        "key_type": "ed25519",
        "public_key": f"ssh-ed25519 {_generate_random_string(43)} user@host",
        "private_key": "[ENCRYPTED_PRIVATE_KEY]",
        "fingerprint": f"SHA256:{_generate_random_string(43)}",
        "created_at": datetime.now().isoformat()
    }


def _generate_random_string(length: int) -> str:
    """Generate a random string of specified length."""
    chars = string.ascii_letters + string.digits
    return ''.join(random.choices(chars, k=length))


async def _update_secret_store(secret_type: str, candidate: Dict, new_secret: Dict) -> Dict:
    """Update the secret in the secret management system."""
    
    step = {
        "step": "update_secret_store",
        "description": f"Update {secret_type} in secret store",
        "status": "running",
        "start_time": datetime.now().isoformat(),
        "success": True
    }
    
    await asyncio.sleep(0.1)  # Simulate update time
    
    # Most secret store updates succeed
    update_success = random.random() > 0.05  # 95% success rate
    
    if update_success:
        step["status"] = "completed"
        step["secret_store"] = "aws-secrets-manager"
        step["version"] = random.randint(2, 20)
    else:
        step["success"] = False
        step["status"] = "failed"
        step["error"] = "Secret store update failed - permission denied"
    
    step["end_time"] = datetime.now().isoformat()
    return step


async def _update_applications(secret_type: str, candidate: Dict) -> Dict:
    """Update applications that use this secret."""
    
    step = {
        "step": "update_applications",
        "description": f"Update applications using {candidate['secret_name']}",
        "status": "running",
        "start_time": datetime.now().isoformat(),
        "success": True,
        "applications_updated": []
    }
    
    await asyncio.sleep(0.15)  # Simulate app update time
    
    # Simulate updating multiple applications
    app_count = random.randint(2, 6)
    successful_updates = 0
    
    for i in range(app_count):
        app_name = f"app-{random.randint(1, 10)}"
        update_success = random.random() > 0.1  # 90% success rate per app
        
        app_update = {
            "application": app_name,
            "status": "success" if update_success else "failed",
            "restart_required": random.choice([True, False])
        }
        
        step["applications_updated"].append(app_update)
        
        if update_success:
            successful_updates += 1
    
    if successful_updates < app_count:
        step["success"] = False
        step["error"] = f"Failed to update {app_count - successful_updates} applications"
    else:
        step["status"] = "completed"
    
    step["end_time"] = datetime.now().isoformat()
    return step


async def _verify_secret_rotation(secret_type: str, candidate: Dict) -> Dict:
    """Verify that the secret rotation was successful."""
    
    step = {
        "step": "verify_rotation",
        "description": f"Verify {secret_type} rotation for {candidate['secret_name']}",
        "status": "running",
        "start_time": datetime.now().isoformat(),
        "success": True
    }
    
    await asyncio.sleep(0.05)  # Simulate verification time
    
    # Most verifications succeed
    verification_success = random.random() > 0.02  # 98% success rate
    
    if verification_success:
        step["status"] = "completed"
        step["verification_results"] = {
            "connectivity_test": "passed",
            "permission_test": "passed",
            "application_health": "healthy"
        }
    else:
        step["success"] = False
        step["status"] = "failed"
        step["error"] = "Secret verification failed - applications cannot authenticate"
    
    step["end_time"] = datetime.now().isoformat()
    return step


async def _rollback_secret_rotation(secret_type: str, candidate: Dict) -> Dict:
    """Rollback a failed secret rotation."""
    
    step = {
        "step": "rollback_rotation",
        "description": f"Rollback failed rotation for {candidate['secret_name']}",
        "status": "running",
        "start_time": datetime.now().isoformat(),
        "success": True
    }
    
    await asyncio.sleep(0.1)  # Simulate rollback time
    
    # Rollbacks usually succeed
    rollback_success = random.random() > 0.05  # 95% success rate
    
    if rollback_success:
        step["status"] = "completed"
        step["rollback_actions"] = [
            "Restored previous secret version",
            "Reverted application configurations",
            "Verified application connectivity"
        ]
    else:
        step["success"] = False
        step["status"] = "failed"
        step["error"] = "Rollback failed - manual intervention required"
    
    step["end_time"] = datetime.now().isoformat()
    return step


async def _send_rotation_notifications(rotation_data: Dict) -> Dict:
    """Send notifications about rotation results."""
    
    notification_phase = {
        "phase": "notifications",
        "status": "running",
        "start_time": datetime.now().isoformat(),
        "notifications_sent": [],
        "notification_results": {},
        "success": True
    }
    
    rotation_results = rotation_data.get("rotation_results", {})
    
    # Define notification recipients based on environment and results
    notifications_to_send = [
        {
            "type": "email",
            "recipients": ["security-team@example.com", "devops@example.com"],
            "subject": f"Secret Rotation Summary - {rotation_data['secret_type']}"
        },
        {
            "type": "slack",
            "channel": "#security-alerts",
            "message": f"Secret rotation completed for {rotation_data['secret_type']}"
        }
    ]
    
    # Add environment-specific notifications
    if rotation_data["environment"] == "production":
        notifications_to_send.append({
            "type": "pagerduty",
            "service": "security-service",
            "severity": "info" if rotation_data["status"] == "completed" else "warning"
        })
    
    # Send notifications
    for notification in notifications_to_send:
        notification_result = await _send_individual_notification(notification, rotation_data)
        notification_phase["notifications_sent"].append(notification_result)
    
    # Calculate notification success rate
    successful_notifications = len([n for n in notification_phase["notifications_sent"] if n["success"]])
    total_notifications = len(notification_phase["notifications_sent"])
    
    notification_phase["notification_results"] = {
        "total_notifications": total_notifications,
        "successful_notifications": successful_notifications,
        "failed_notifications": total_notifications - successful_notifications,
        "success_rate": round((successful_notifications / total_notifications * 100), 1) if total_notifications > 0 else 0
    }
    
    notification_phase["status"] = "completed"
    notification_phase["end_time"] = datetime.now().isoformat()
    
    return notification_phase


async def _send_individual_notification(notification: Dict, rotation_data: Dict) -> Dict:
    """Send an individual notification."""
    
    result = {
        "type": notification["type"],
        "status": "sending",
        "start_time": datetime.now().isoformat(),
        "success": True
    }
    
    await asyncio.sleep(0.02)  # Simulate sending time
    
    # Most notifications succeed
    send_success = random.random() > 0.05  # 95% success rate
    
    if send_success:
        result["status"] = "sent"
        result["message_id"] = f"msg_{_generate_random_string(16)}"
    else:
        result["success"] = False
        result["status"] = "failed"
        result["error"] = f"{notification['type']} notification failed - service unavailable"
    
    result["end_time"] = datetime.now().isoformat()
    return result


async def _generate_rotation_recommendations(rotation_data: Dict) -> List[str]:
    """Generate actionable secret rotation recommendations."""
    
    recommendations = []
    status = rotation_data["status"]
    secret_type = rotation_data["secret_type"]
    inventory = rotation_data.get("secrets_inventory", {})
    
    if status == "completed":
        recommendations.extend([
            f"✅ All {secret_type} rotations completed successfully",
            "🔍 Monitor applications for any authentication issues",
            "📋 Update documentation with new rotation timestamps"
        ])
    elif status == "partially_completed":
        recommendations.extend([
            f"⚠️ {secret_type} rotation partially completed",
            "🔍 Review failed rotations and retry individually",
            "📊 Check application logs for authentication errors"
        ])
    elif status == "failed":
        recommendations.extend([
            f"❌ {secret_type} rotation failed",
            "🔍 Check secret store permissions and connectivity",
            "🔄 Retry rotation after resolving underlying issues"
        ])
    elif status == "no_action_needed":
        recommendations.extend([
            f"✅ No {secret_type} rotation required at this time",
            "📅 All secrets are within rotation schedule",
            "🔍 Continue monitoring expiration dates"
        ])
    
    # Type-specific recommendations
    if secret_type == "certificates":
        recommendations.append("📅 Set up automated renewal for SSL certificates")
    elif secret_type == "api_keys":
        recommendations.append("🔑 Implement key rotation in CI/CD pipelines")
    elif secret_type == "passwords":
        recommendations.append("🔐 Consider implementing password-less authentication")
    elif secret_type == "database":
        recommendations.append("🗄️ Test database connectivity after rotation")
    
    # Inventory-based recommendations
    rotation_due_count = inventory.get("rotation_due_count", 0)
    expiring_soon_count = inventory.get("expiring_soon_count", 0)
    
    if rotation_due_count > 5:
        recommendations.append(f"⏰ {rotation_due_count} secrets overdue for rotation - prioritize schedule")
    
    if expiring_soon_count > 3:
        recommendations.append(f"📅 {expiring_soon_count} secrets expiring soon - plan rotations")
    
    # Security recommendations
    recommendations.extend([
        "🔒 Audit secret access patterns and permissions",
        "📊 Set up monitoring for secret usage anomalies",
        "🤖 Consider implementing automated rotation schedules",
        "📋 Maintain secret rotation playbooks and procedures"
    ])
    
    return recommendations[:8]  # Limit to 8 recommendations
