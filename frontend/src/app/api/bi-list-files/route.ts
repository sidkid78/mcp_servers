import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const ALLOWED_EXTS = new Set(['.csv', '.xlsx', '.xls', '.json', '.parquet']);

export async function POST(req: NextRequest) {
  try {
    const { data_path } = await req.json();
    if (typeof data_path !== 'string' || !data_path.length) {
      return NextResponse.json({ success: false, error: 'data_path is required' }, { status: 400 });
    }

    // Base to the BI MCP server root
    const biBase = path.join(process.cwd(), '..', 'mcp-servers', 'business-intelligence-mcp');

    // Resolve target path; allow absolute path only if within BI base
    const candidate = path.isAbsolute(data_path)
      ? path.normalize(data_path)
      : path.normalize(path.join(biBase, data_path));

    // Security: ensure the resolved path is inside the BI base directory
    const relative = path.relative(biBase, candidate);
    if (relative.startsWith('..') || path.isAbsolute(relative)) {
      return NextResponse.json({ success: false, error: 'Path not allowed' }, { status: 400 });
    }

    // Read directory (non-recursive)
    let entries: string[] = [];
    try {
      const dirents = fs.readdirSync(candidate, { withFileTypes: true });
      entries = dirents
        .filter((d) => d.isFile() && ALLOWED_EXTS.has(path.extname(d.name).toLowerCase()))
        .map((d) => d.name);
    } catch {
      return NextResponse.json({ success: false, error: `Failed to read directory: ${candidate}` }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: { base: candidate, files: entries } });
  } catch {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}


