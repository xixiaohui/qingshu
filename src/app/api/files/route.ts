export const dynamic = 'force-dynamic';

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
        { status: res.status }
      );
    }

    const data = await res.json();

    return Response.json({
      success: true,
      ...data,
    });
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        message: error.message || '请求文件服务器失败',
      },
      { status: 500 }
    );
  }
}
