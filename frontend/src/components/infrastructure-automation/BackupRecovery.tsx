"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { 
  Database, 
  HardDrive, 
  Shield, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Download,
  Upload,
  Server,
  FileText,
  Calendar
} from 'lucide-react';

interface BackupRecoveryProps {
  onExecutePrompt?: (prompt: string, params?: unknown) => Promise<unknown>;
}

export function BackupRecovery({ onExecutePrompt }: BackupRecoveryProps) {
  const [dataSource, setDataSource] = useState("");
  const [backupType, setBackupType] = useState("incremental");
  const [retentionDays, setRetentionDays] = useState<string>("30");
  const [verify, setVerify] = useState(true);
  const [drScenario, setDrScenario] = useState<string>("full-outage");
  const [rtoTarget, setRtoTarget] = useState<string>("4h");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [, setServerStatus] = useState<string | null>(null);
  const [backupLogs, setBackupLogs] = useState<string[]>([]);

  const backupJobs = [
    {
      name: "Database Backup",
      source: "PostgreSQL Cluster",
      type: "full",
      status: "completed",
      lastRun: "2 hours ago",
      nextRun: "in 22 hours",
      size: "2.4 GB",
      retention: "30 days",
      progress: 100
    },
    {
      name: "Application Data",
      source: "/app/data",
      type: "incremental",
      status: "running",
      lastRun: "30 minutes ago",
      nextRun: "in 3.5 hours",
      size: "156 MB",
      retention: "7 days",
      progress: 65
    },
    {
      name: "Configuration Files",
      source: "/etc/configs",
      type: "differential",
      status: "completed",
      lastRun: "1 hour ago",
      nextRun: "in 23 hours",
      size: "45 MB",
      retention: "90 days",
      progress: 100
    },
    {
      name: "User Uploads",
      source: "S3 Bucket",
      type: "full",
      status: "failed",
      lastRun: "4 hours ago",
      nextRun: "in 20 hours",
      size: "1.8 GB",
      retention: "30 days",
      progress: 0
    }
  ];

  const recoveryPoints = [
    {
      timestamp: "2024-01-15 14:30:00",
      type: "Full Backup",
      size: "2.4 GB",
      status: "verified",
      rpo: "1 hour",
      rto: "30 minutes"
    },
    {
      timestamp: "2024-01-15 12:00:00",
      type: "Incremental",
      size: "125 MB",
      status: "verified",
      rpo: "4 hours",
      rto: "15 minutes"
    },
    {
      timestamp: "2024-01-15 08:00:00",
      type: "Incremental",
      size: "98 MB",
      status: "verified",
      rpo: "8 hours",
      rto: "15 minutes"
    },
    {
      timestamp: "2024-01-14 20:00:00",
      type: "Full Backup",
      size: "2.3 GB",
      status: "verified",
      rpo: "18 hours",
      rto: "30 minutes"
    }
  ];

  const servers = [
    { name: "Primary DB Server", status: "online", load: 45 },
    { name: "Backup Server", status: "online", load: 23 },
    { name: "Storage Server", status: "maintenance", load: 0 },
    { name: "Recovery Server", status: "offline", load: 0 }
  ];

  const handleBackupData = async () => {
    if (!onExecutePrompt || !dataSource) return;

    setIsLoading(true);
    setBackupLogs(prev => [...prev, `Starting backup for ${dataSource}...`]);

    try {
      const result = await onExecutePrompt('backup_data', {
        data_source: dataSource,
        backup_type: backupType,
        retention_days: parseInt(retentionDays),
        verify: verify
      });
      setBackupLogs(prev => [...prev, `Backup completed successfully: ${JSON.stringify(result)}`]);
      console.log('Backup result:', result);
    } catch (error) {
      setBackupLogs(prev => [...prev, `Backup failed: ${error}`]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisasterRecovery = async () => {
    if (!onExecutePrompt) return;
    
    setIsLoading(true);
    setBackupLogs(prev => [...prev, `Planning disaster recovery for scenario: ${drScenario}...`]);
    
    try {
      const result = await onExecutePrompt('disaster-recovery', {
        scenario: drScenario,
        rto_target: rtoTarget
      });
      setBackupLogs(prev => [...prev, `Recovery plan generated: ${JSON.stringify(result)}`]);
      console.log('Disaster recovery result:', result);
    } catch (error) {
      setBackupLogs(prev => [...prev, `Recovery planning failed: ${error}`]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setIsUploading(true);
    setUploadProgress(0);
    setBackupLogs(prev => [...prev, `Starting upload of ${file.name}...`]);

    // Simulate file upload progress
    const uploadInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          setIsUploading(false);
          setBackupLogs(prevLogs => [...prevLogs, `Upload completed: ${file.name}`]);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleServerAction = (serverName: string, action: string) => {
    setBackupLogs(prev => [...prev, `${action} initiated for ${serverName}`]);
    
    if (action === "restart") {
      setServerStatus("restarting");
      handleServerStatusChange(serverName, "restarting");
      setTimeout(() => {
        setServerStatus("online");
        handleServerStatusChange(serverName, "online");
        setBackupLogs(prev => [...prev, `${serverName} restarted successfully`]);
      }, 3000);
    }
  };
  const handleServerStatusChange = (serverName: string, status: string) => {
    setServerStatus(status);
    setBackupLogs(prev => [...prev, `${serverName} status changed to ${status}`]);
  };

  const clearLogs = () => {
    setBackupLogs([]);
  };

  const exportLogs = () => {
    const logContent = backupLogs.join('\n');
    const blob = new Blob([logContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup-logs-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'running':
        return <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />;
      case 'failed':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'running':
        return 'bg-blue-100 text-blue-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'online':
        return 'bg-green-100 text-green-800';
      case 'offline':
        return 'bg-red-100 text-red-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getServerStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'offline':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'maintenance':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <Server className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Backup Configuration */}
      <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-blue-600" />
            Backup Configuration
          </CardTitle>
          <CardDescription>Configure and execute data backup operations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="data-source">Data Source</Label>
              <Input
                id="data-source"
                value={dataSource}
                onChange={(e) => setDataSource(e.target.value)}
                placeholder="e.g., /app/data, postgres://db:5432/mydb"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="backup-type">Backup Type</Label>
              <Select value={backupType} onValueChange={setBackupType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select backup type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Full Backup</SelectItem>
                  <SelectItem value="incremental">Incremental</SelectItem>
                  <SelectItem value="differential">Differential</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="retention-days">Retention (Days)</Label>
              <Input
                id="retention-days"
                type="number"
                value={retentionDays}
                onChange={(e) => setRetentionDays(e.target.value)}
                placeholder="30"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="verify" 
                checked={verify} 
                onCheckedChange={(checked) => setVerify(checked === true)}
              />
              <Label htmlFor="verify" className="text-sm font-medium">
                Verify backup integrity after creation
              </Label>
            </div>
          </div>

          <Button 
            onClick={handleBackupData}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
            disabled={isLoading || !dataSource}
          >
            <Database className="h-4 w-4 mr-2" />
            Create Backup
          </Button>
        </CardContent>
      </Card>

      {/* File Upload Section */}
      <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-green-600" />
            Backup File Upload
          </CardTitle>
          <CardDescription>Upload backup files for restoration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="backup-file">Select Backup File</Label>
            <Input
              id="backup-file"
              type="file"
              onChange={handleFileUpload}
              accept=".sql,.tar,.gz,.zip"
              disabled={isUploading}
            />
          </div>
          
          {isUploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Uploading {selectedFile?.name}...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Server Status */}
      <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5 text-purple-600" />
            Server Status
          </CardTitle>
          <CardDescription>Monitor backup infrastructure servers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {servers.map((server, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  {getServerStatusIcon(server.status)}
                  <div>
                    <h4 className="font-medium">{server.name}</h4>
                    <p className="text-sm text-gray-500">Load: {server.load}%</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(server.status)}>
                    {server.status}
                  </Badge>
                  {server.status === 'online' && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleServerAction(server.name, 'restart')}
                    >
                      Restart
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Backup Logs */}
      <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-indigo-600" />
            Backup Logs
          </CardTitle>
          <CardDescription>Real-time backup operation logs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={clearLogs}>
              Clear Logs
            </Button>
            <Button size="sm" variant="outline" onClick={exportLogs} disabled={backupLogs.length === 0}>
              <Download className="h-4 w-4 mr-2" />
              Export Logs
            </Button>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
            {backupLogs.length === 0 ? (
              <p className="text-gray-500 text-sm">No logs available</p>
            ) : (
              <div className="space-y-1">
                {backupLogs.map((log, index) => (
                  <div key={index} className="text-sm font-mono text-gray-700">
                    <span className="text-gray-400">[{new Date().toLocaleTimeString()}]</span> {log}
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Disaster Recovery Planning */}
      <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-600" />
            Disaster Recovery Planning
          </CardTitle>
          <CardDescription>Plan and test disaster recovery scenarios</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dr-scenario">Recovery Scenario</Label>
              <Select value={drScenario} onValueChange={setDrScenario}>
                <SelectTrigger>
                  <SelectValue placeholder="Select scenario" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-outage">Full System Outage</SelectItem>
                  <SelectItem value="database-failure">Database Failure</SelectItem>
                  <SelectItem value="network-outage">Network Outage</SelectItem>
                  <SelectItem value="datacenter-loss">Datacenter Loss</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rto-target">RTO Target</Label>
              <Select value={rtoTarget} onValueChange={setRtoTarget}>
                <SelectTrigger>
                  <SelectValue placeholder="Select RTO" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">1 Hour</SelectItem>
                  <SelectItem value="4h">4 Hours</SelectItem>
                  <SelectItem value="8h">8 Hours</SelectItem>
                  <SelectItem value="24h">24 Hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={handleDisasterRecovery}
            className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
            disabled={isLoading}
          >
            <Shield className="h-4 w-4 mr-2" />
            Plan Recovery Strategy
          </Button>
        </CardContent>
      </Card>

      {/* Backup Jobs Status */}
      <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-green-600" />
            Backup Jobs Status
          </CardTitle>
          <CardDescription>Current status of scheduled backup operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {backupJobs.map((job, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  {getStatusIcon(job.status)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{job.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {job.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">
                      {job.source} • Size: {job.size}
                    </p>
                    {job.status === 'running' && (
                      <div className="mt-2">
                        <Progress value={job.progress} className="w-full h-2" />
                        <p className="text-xs text-gray-500 mt-1">{job.progress}% complete</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="text-right space-y-1">
                  <Badge className={getStatusColor(job.status)}>
                    {job.status}
                  </Badge>
                  <p className="text-xs text-gray-500">
                    Last: {job.lastRun}
                  </p>
                  <p className="text-xs text-gray-500">
                    Next: {job.nextRun}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recovery Points */}
      <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-600" />
            Available Recovery Points
          </CardTitle>
          <CardDescription>Available backup snapshots for point-in-time recovery</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recoveryPoints.map((point, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <Database className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{point.timestamp}</h4>
                    <p className="text-sm text-gray-500">
                      {point.type} • {point.size}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right text-sm">
                    <p className="text-gray-600">RPO: {point.rpo}</p>
                    <p className="text-gray-600">RTO: {point.rto}</p>
                  </div>
                  <Badge className={getStatusColor(point.status)}>
                    {point.status}
                  </Badge>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Backup Statistics */}
      <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HardDrive className="h-5 w-5 text-blue-600" />
            Backup Statistics
          </CardTitle>
          <CardDescription>Backup performance and storage metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="text-center space-y-2">
              <div className="p-4 bg-green-50 rounded-lg">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">98.5%</p>
                <p className="text-sm text-gray-600">Success Rate</p>
              </div>
            </div>

            <div className="text-center space-y-2">
              <div className="p-4 bg-blue-50 rounded-lg">
                <HardDrive className="h-8 w-8 text-blue-600 mx-auto" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">24.7 GB</p>
                <p className="text-sm text-gray-600">Total Backups</p>
              </div>
            </div>

            <div className="text-center space-y-2">
              <div className="p-4 bg-purple-50 rounded-lg">
                <Clock className="h-8 w-8 text-purple-600 mx-auto" />
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">2.3m</p>
                <p className="text-sm text-gray-600">Avg Duration</p>
              </div>
            </div>

            <div className="text-center space-y-2">
              <div className="p-4 bg-orange-50 rounded-lg">
                <Shield className="h-8 w-8 text-orange-600 mx-auto" />
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-600">15min</p>
                <p className="text-sm text-gray-600">Avg RTO</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
          <span className="text-gray-600">Processing backup operation...</span>
        </div>
      )}
    </div>
  );
}
