"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  Lock, 
  Key, 
  AlertTriangle, 
  CheckCircle, 
  Eye,
  RefreshCw,
  FileText,
  Users,
  Globe,
  Database,
  Server,
  Zap
} from 'lucide-react';

interface SecurityCenterProps {
  onExecutePrompt?: (prompt: string, params?: unknown) => Promise<unknown>;
}

export function SecurityCenter({ onExecutePrompt }: SecurityCenterProps) {
  const [secretType, setSecretType] = useState("api_keys");
  const [environment, setEnvironment] = useState("all");
  const [forceRotation, setForceRotation] = useState(false);
  const [notify, setNotify] = useState(true);
  const [auditScope, setAuditScope] = useState("full");
  const [complianceFramework, setComplianceFramework] = useState("none");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUserRole, setSelectedUserRole] = useState("all");
  const [networkZone, setNetworkZone] = useState("all");
  const [databaseType, setDatabaseType] = useState("all");
  const [serverType, setServerType] = useState("all");
  const [automationLevel, setAutomationLevel] = useState("medium");

  const securityMetrics = [
    { name: "Security Score", value: "A+", color: "text-green-400 dark:text-green-300", bg: "bg-green-50 dark:bg-green-900/20" },
    { name: "Vulnerabilities", value: "2", color: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-50 dark:bg-yellow-900/20" },
    { name: "Compliance", value: "98%", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/20" },
    { name: "Last Audit", value: "2d ago", color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-900/20" }
  ];

  const securityAlerts = [
    {
      severity: "high",
      title: "SSL Certificate Expiring",
      description: "Domain certificate expires in 7 days",
      timestamp: "2 hours ago",
      status: "open"
    },
    {
      severity: "medium",
      title: "Outdated Dependencies",
      description: "3 packages have security updates available",
      timestamp: "1 day ago",
      status: "investigating"
    },
    {
      severity: "low",
      title: "Unused IAM Role",
      description: "Role 'legacy-service' hasn't been used in 90 days",
      timestamp: "3 days ago",
      status: "acknowledged"
    }
  ];

  const secrets = [
    {
      name: "Database Credentials",
      type: "database",
      environment: "production",
      lastRotated: "30 days ago",
      status: "expiring",
      nextRotation: "in 7 days"
    },
    {
      name: "API Keys",
      type: "api_keys",
      environment: "all",
      lastRotated: "15 days ago",
      status: "healthy",
      nextRotation: "in 75 days"
    },
    {
      name: "SSL Certificates",
      type: "certificates",
      environment: "production",
      lastRotated: "60 days ago",
      status: "warning",
      nextRotation: "in 5 days"
    },
    {
      name: "Service Passwords",
      type: "passwords",
      environment: "staging",
      lastRotated: "45 days ago",
      status: "healthy",
      nextRotation: "in 45 days"
    }
  ];

  const userAccess = [
    {
      name: "Admin Users",
      count: 5,
      role: "admin",
      lastActivity: "2 hours ago",
      status: "active",
      permissions: "full"
    },
    {
      name: "Developer Users",
      count: 23,
      role: "developer",
      lastActivity: "30 minutes ago",
      status: "active",
      permissions: "limited"
    },
    {
      name: "Read-Only Users",
      count: 12,
      role: "readonly",
      lastActivity: "1 day ago",
      status: "inactive",
      permissions: "read"
    },
    {
      name: "Service Accounts",
      count: 8,
      role: "service",
      lastActivity: "5 minutes ago",
      status: "active",
      permissions: "automated"
    }
  ];

  const networkSecurity = [
    {
      zone: "DMZ",
      status: "secure",
      firewallRules: 45,
      openPorts: 3,
      lastScan: "1 hour ago",
      threats: 0
    },
    {
      zone: "Internal",
      status: "warning",
      firewallRules: 128,
      openPorts: 12,
      lastScan: "6 hours ago",
      threats: 2
    },
    {
      zone: "Database",
      status: "secure",
      firewallRules: 23,
      openPorts: 1,
      lastScan: "2 hours ago",
      threats: 0
    },
    {
      zone: "External",
      status: "monitoring",
      firewallRules: 67,
      openPorts: 8,
      lastScan: "30 minutes ago",
      threats: 1
    }
  ];

  const databaseSecurity = [
    {
      name: "Production DB",
      type: "postgresql",
      encryption: "enabled",
      backups: "daily",
      lastAudit: "1 week ago",
      status: "secure",
      connections: 45
    },
    {
      name: "Analytics DB",
      type: "mongodb",
      encryption: "enabled",
      backups: "hourly",
      lastAudit: "3 days ago",
      status: "secure",
      connections: 12
    },
    {
      name: "Cache DB",
      type: "redis",
      encryption: "disabled",
      backups: "none",
      lastAudit: "2 weeks ago",
      status: "warning",
      connections: 8
    },
    {
      name: "Staging DB",
      type: "mysql",
      encryption: "enabled",
      backups: "weekly",
      lastAudit: "5 days ago",
      status: "secure",
      connections: 23
    }
  ];

  const serverSecurity = [
    {
      name: "Web Servers",
      count: 6,
      type: "web",
      os: "Ubuntu 22.04",
      patches: "up-to-date",
      monitoring: "active",
      status: "secure"
    },
    {
      name: "API Servers",
      count: 4,
      type: "api",
      os: "CentOS 8",
      patches: "pending",
      monitoring: "active",
      status: "warning"
    },
    {
      name: "Database Servers",
      count: 3,
      type: "database",
      os: "Ubuntu 20.04",
      patches: "up-to-date",
      monitoring: "active",
      status: "secure"
    },
    {
      name: "Load Balancers",
      count: 2,
      type: "loadbalancer",
      os: "Alpine Linux",
      patches: "up-to-date",
      monitoring: "active",
      status: "secure"
    }
  ];

  const automationRules = [
    {
      name: "Auto Patch Management",
      type: "patching",
      status: "active",
      frequency: "weekly",
      lastRun: "2 days ago",
      success: "100%"
    },
    {
      name: "Vulnerability Scanning",
      type: "scanning",
      status: "active",
      frequency: "daily",
      lastRun: "6 hours ago",
      success: "98%"
    },
    {
      name: "Backup Verification",
      type: "backup",
      status: "active",
      frequency: "daily",
      lastRun: "12 hours ago",
      success: "100%"
    },
    {
      name: "Compliance Monitoring",
      type: "compliance",
      status: "active",
      frequency: "continuous",
      lastRun: "5 minutes ago",
      success: "95%"
    }
  ];

  const handleRotateSecrets = async () => {
    if (!onExecutePrompt) return;
    
    setIsLoading(true);
    try {
      const result = await onExecutePrompt('rotate_secrets', {
        secret_type: secretType,
        environment: environment,
        force_rotation: forceRotation,
        notify: notify
      });
      console.log('Secret rotation result:', result);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSecurityAudit = async () => {
    if (!onExecutePrompt) return;
    
    setIsLoading(true);
    try {
      const result = await onExecutePrompt('security-audit', {
        audit_scope: auditScope,
        compliance_framework: complianceFramework
      });
      console.log('Security audit result:', result);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserAccessReview = async () => {
    if (!onExecutePrompt) return;
    
    setIsLoading(true);
    try {
      const result = await onExecutePrompt('user-access-review', {
        role: selectedUserRole,
        include_inactive: true
      });
      console.log('User access review result:', result);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNetworkScan = async () => {
    if (!onExecutePrompt) return;
    
    setIsLoading(true);
    try {
      const result = await onExecutePrompt('network-security-scan', {
        zone: networkZone,
        deep_scan: true
      });
      console.log('Network scan result:', result);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDatabaseAudit = async () => {
    if (!onExecutePrompt) return;
    
    setIsLoading(true);
    try {
      const result = await onExecutePrompt('database-security-audit', {
        database_type: databaseType,
        check_encryption: true,
        verify_backups: true
      });
      console.log('Database audit result:', result);
    } finally {
      setIsLoading(false);
    }
  };

  const handleServerHardening = async () => {
    if (!onExecutePrompt) return;
    
    setIsLoading(true);
    try {
      const result = await onExecutePrompt('server-hardening', {
        server_type: serverType,
        apply_patches: true,
        update_configs: true
      });
      console.log('Server hardening result:', result);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAutomationSetup = async () => {
    if (!onExecutePrompt) return;
    
    setIsLoading(true);
    try {
      const result = await onExecutePrompt('setup-security-automation', {
        automation_level: automationLevel,
        enable_notifications: true
      });
      console.log('Automation setup result:', result);
    } finally {
      setIsLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800';
      case 'medium':
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800';
      case 'low':
        return 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'secure':
      case 'active':
        return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300';
      case 'warning':
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300';
      case 'expiring':
      case 'inactive':
        return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300';
      case 'monitoring':
        return 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'secure':
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />;
      case 'warning':
      case 'pending':
        return <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />;
      case 'expiring':
      case 'inactive':
        return <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />;
      default:
        return <Eye className="h-4 w-4 text-gray-600 dark:text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {securityMetrics.map((metric, index) => (
          <Card key={index} className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0 shadow-lg dark:shadow-gray-900/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{metric.name}</p>
                  <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${metric.bg}`}>
                  <Shield className={`h-6 w-6 ${metric.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* User Access Management */}
      <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0 shadow-lg dark:shadow-gray-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            User Access Management
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">Monitor and manage user permissions and access patterns</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="user-role" className="text-gray-700 dark:text-gray-300">User Role</Label>
              <Select value={selectedUserRole} onValueChange={setSelectedUserRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select user role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin Users</SelectItem>
                  <SelectItem value="developer">Developer Users</SelectItem>
                  <SelectItem value="readonly">Read-Only Users</SelectItem>
                  <SelectItem value="service">Service Accounts</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                onClick={handleUserAccessReview}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600"
                disabled={isLoading}
              >
                <Users className="h-4 w-4 mr-2" />
                Review Access
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {userAccess.map((user, index) => (
              <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-800/50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">{user.name}</h4>
                  <Badge className={getStatusColor(user.status)}>
                    {user.status}
                  </Badge>
                </div>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">{user.count}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Last: {user.lastActivity}</p>
                <Badge variant="outline" className="text-xs border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">
                  {user.permissions}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Network Security */}
      <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0 shadow-lg dark:shadow-gray-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <Globe className="h-5 w-5 text-green-600 dark:text-green-400" />
            Network Security Monitoring
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">Monitor network zones, firewall rules, and threat detection</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="network-zone" className="text-gray-700 dark:text-gray-300">Network Zone</Label>
              <Select value={networkZone} onValueChange={setNetworkZone}>
                <SelectTrigger>
                  <SelectValue placeholder="Select network zone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Zones</SelectItem>
                  <SelectItem value="dmz">DMZ</SelectItem>
                  <SelectItem value="internal">Internal</SelectItem>
                  <SelectItem value="database">Database</SelectItem>
                  <SelectItem value="external">External</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                onClick={handleNetworkScan}
                className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 dark:from-green-500 dark:to-teal-500 dark:hover:from-green-600 dark:hover:to-teal-600"
                disabled={isLoading}
              >
                <Globe className="h-4 w-4 mr-2" />
                Scan Network
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {networkSecurity.map((zone, index) => (
              <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-800/50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">{zone.zone}</h4>
                  <Badge className={getStatusColor(zone.status)}>
                    {zone.status}
                  </Badge>
                </div>
                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <p>Rules: {zone.firewallRules}</p>
                  <p>Open Ports: {zone.openPorts}</p>
                  <p>Threats: {zone.threats}</p>
                  <p className="text-xs">Scan: {zone.lastScan}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Database Security */}
      <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0 shadow-lg dark:shadow-gray-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <Database className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            Database Security Management
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">Monitor database encryption, backups, and access controls</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="database-type" className="text-gray-700 dark:text-gray-300">Database Type</Label>
              <Select value={databaseType} onValueChange={setDatabaseType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select database type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Databases</SelectItem>
                  <SelectItem value="postgresql">PostgreSQL</SelectItem>
                  <SelectItem value="mongodb">MongoDB</SelectItem>
                  <SelectItem value="redis">Redis</SelectItem>
                  <SelectItem value="mysql">MySQL</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                onClick={handleDatabaseAudit}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 dark:from-purple-500 dark:to-pink-500 dark:hover:from-purple-600 dark:hover:to-pink-600"
                disabled={isLoading}
              >
                <Database className="h-4 w-4 mr-2" />
                Audit Databases
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {databaseSecurity.map((db, index) => (
              <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-800/50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">{db.name}</h4>
                  <Badge className={getStatusColor(db.status)}>
                    {db.status}
                  </Badge>
                </div>
                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <p>Type: {db.type}</p>
                  <p>Encryption: {db.encryption}</p>
                  <p>Backups: {db.backups}</p>
                  <p>Connections: {db.connections}</p>
                  <p className="text-xs">Audit: {db.lastAudit}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Server Security */}
      <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0 shadow-lg dark:shadow-gray-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <Server className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            Server Security & Hardening
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">Monitor server security, patches, and system hardening</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="server-type" className="text-gray-700 dark:text-gray-300">Server Type</Label>
              <Select value={serverType} onValueChange={setServerType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select server type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Servers</SelectItem>
                  <SelectItem value="web">Web Servers</SelectItem>
                  <SelectItem value="api">API Servers</SelectItem>
                  <SelectItem value="database">Database Servers</SelectItem>
                  <SelectItem value="loadbalancer">Load Balancers</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                onClick={handleServerHardening}
                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 dark:from-orange-500 dark:to-red-500 dark:hover:from-orange-600 dark:hover:to-red-600"
                disabled={isLoading}
              >
                <Server className="h-4 w-4 mr-2" />
                Harden Servers
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {serverSecurity.map((server, index) => (
              <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-800/50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">{server.name}</h4>
                  <Badge className={getStatusColor(server.status)}>
                    {server.status}
                  </Badge>
                </div>
                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <p>Count: {server.count}</p>
                  <p>OS: {server.os}</p>
                  <p>Patches: {server.patches}</p>
                  <p>Monitoring: {server.monitoring}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Automation */}
      <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0 shadow-lg dark:shadow-gray-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <Zap className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            Security Automation & Orchestration
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">Configure automated security processes and monitoring</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="automation-level" className="text-gray-700 dark:text-gray-300">Automation Level</Label>
              <Select value={automationLevel} onValueChange={setAutomationLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select automation level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low - Manual Approval</SelectItem>
                  <SelectItem value="medium">Medium - Semi-Automated</SelectItem>
                  <SelectItem value="high">High - Fully Automated</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                onClick={handleAutomationSetup}
                className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 dark:from-yellow-500 dark:to-orange-500 dark:hover:from-yellow-600 dark:hover:to-orange-600"
                disabled={isLoading}
              >
                <Zap className="h-4 w-4 mr-2" />
                Setup Automation
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {automationRules.map((rule, index) => (
              <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-800/50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">{rule.name}</h4>
                  <Badge className={getStatusColor(rule.status)}>
                    {rule.status}
                  </Badge>
                </div>
                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <p>Frequency: {rule.frequency}</p>
                  <p>Last Run: {rule.lastRun}</p>
                  <p>Success Rate: {rule.success}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Secret Management */}
      <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0 shadow-lg dark:shadow-gray-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <Key className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            Secret Rotation & Management
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">Manage and rotate security credentials across environments</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="secret-type" className="text-gray-700 dark:text-gray-300">Secret Type</Label>
              <Select value={secretType} onValueChange={setSecretType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select secret type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="api_keys">API Keys</SelectItem>
                  <SelectItem value="certificates">SSL Certificates</SelectItem>
                  <SelectItem value="passwords">Passwords</SelectItem>
                  <SelectItem value="database">Database Credentials</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="environment" className="text-gray-700 dark:text-gray-300">Environment</Label>
              <Select value={environment} onValueChange={setEnvironment}>
                <SelectTrigger>
                  <SelectValue placeholder="Select environment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Environments</SelectItem>
                  <SelectItem value="production">Production</SelectItem>
                  <SelectItem value="staging">Staging</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="force-rotation" 
                checked={forceRotation} 
                onCheckedChange={(checked) => setForceRotation(checked === true)}
              />
              <Label htmlFor="force-rotation" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Force rotation even if not due
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="notify" 
                checked={notify} 
                onCheckedChange={(checked) => setNotify(checked === true)}
              />
              <Label htmlFor="notify" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Send notifications about rotation status
              </Label>
            </div>
          </div>

          <Button 
            onClick={handleRotateSecrets}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600"
            disabled={isLoading}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Rotate Secrets
          </Button>
        </CardContent>
      </Card>

      {/* Security Audit */}
      <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0 shadow-lg dark:shadow-gray-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
            Security Audit & Compliance
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">Run comprehensive security assessments and compliance checks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="audit-scope" className="text-gray-700 dark:text-gray-300">Audit Scope</Label>
              <Select value={auditScope} onValueChange={setAuditScope}>
                <SelectTrigger>
                  <SelectValue placeholder="Select audit scope" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Full Infrastructure</SelectItem>
                  <SelectItem value="network">Network Security</SelectItem>
                  <SelectItem value="application">Application Security</SelectItem>
                  <SelectItem value="data">Data Security</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="compliance-framework" className="text-gray-700 dark:text-gray-300">Compliance Framework</Label>
              <Select value={complianceFramework} onValueChange={setComplianceFramework}>
                <SelectTrigger>
                  <SelectValue placeholder="Select framework (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="SOC2">SOC 2</SelectItem>
                  <SelectItem value="GDPR">GDPR</SelectItem>
                  <SelectItem value="HIPAA">HIPAA</SelectItem>
                  <SelectItem value="PCI-DSS">PCI DSS</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={handleSecurityAudit}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 dark:from-green-500 dark:to-emerald-500 dark:hover:from-green-600 dark:hover:to-emerald-600"
            disabled={isLoading}
          >
            <Shield className="h-4 w-4 mr-2" />
            Run Security Audit
          </Button>
        </CardContent>
      </Card>

      {/* Secrets Status */}
      <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0 shadow-lg dark:shadow-gray-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <Lock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            Secret Status Overview
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">Current status of managed secrets and credentials</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {secrets.map((secret, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center gap-4">
                  {getStatusIcon(secret.status)}
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">{secret.name}</h4>
                      <Badge variant="outline" className="text-xs border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">
                        {secret.environment}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Last rotated: {secret.lastRotated}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <Badge className={getStatusColor(secret.status)}>
                      {secret.status}
                    </Badge>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {secret.nextRotation}
                    </p>
                  </div>
                  <Button size="sm" variant="outline" className="border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Alerts */}
      <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0 shadow-lg dark:shadow-gray-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            Security Alerts
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">Active security issues requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {securityAlerts.map((alert, index) => (
              <div key={index} className={`p-4 border rounded-lg ${getSeverityColor(alert.severity)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{alert.title}</h4>
                      <Badge className={`text-xs ${getSeverityColor(alert.severity)}`}>
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-sm opacity-90 mb-2">{alert.description}</p>
                    <p className="text-xs opacity-75">{alert.timestamp}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">
                      {alert.status}
                    </Badge>
                    <Button size="sm" variant="outline" className="border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compliance Dashboard */}
      <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0 shadow-lg dark:shadow-gray-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            Compliance Dashboard
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">Security compliance status across frameworks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="text-center space-y-3">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">SOC 2</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Compliant</p>
                <Progress value={100} className="mt-2 h-2" />
              </div>
            </div>

            <div className="text-center space-y-3">
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <AlertTriangle className="h-8 w-8 text-yellow-600 dark:text-yellow-400 mx-auto" />
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">GDPR</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">95% Compliant</p>
                <Progress value={95} className="mt-2 h-2" />
              </div>
            </div>

            <div className="text-center space-y-3">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">ISO 27001</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">98% Compliant</p>
                <Progress value={98} className="mt-2 h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400 mr-3"></div>
          <span className="text-gray-600 dark:text-gray-400">Processing security operation...</span>
        </div>
      )}
    </div>
  );
}
