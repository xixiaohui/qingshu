export const dynamic = 'force-dynamic';

// ✅ 统一 CORS
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// ✅ 处理预检请求（必须）
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function GET() {
  try {
    const res = await fetch('https://files.readmeet.club/internal/list-files', {
      method: 'GET',
      headers: {
        'x-api-key': process.env.FILE_SERVER_API_KEY || '',
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      return Response.json(
        {
          success: false,
          message: `Upstream error: ${res.status}`,
        },
        { status: res.status, headers: corsHeaders }
      );
    }

    const data = await res.json();

    return Response.json(
      {
        success: true,
        ...data,
      },
      { headers: corsHeaders }
    );
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        message: error.message || '请求文件服务器失败',
      },
      { status: 500, headers: corsHeaders }
    );
  }
}
