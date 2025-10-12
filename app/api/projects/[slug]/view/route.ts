import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/writeClient";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(
	request: Request,
	{ params }: { params: Promise<{ slug: string }> },
) {
	try {
		const { slug } = await params;

		// Get the document ID for the project (using read-only client)
		const projectQuery = `*[_type == "devProject" && slug.current == $slug][0]._id`;
		const projectId = await client.fetch(projectQuery, { slug });

		if (!projectId) {
			return NextResponse.json({ error: "Project not found" }, { status: 404 });
		}

		// Increment view count using Sanity mutations (using write client)
		const result = await writeClient
			.patch(projectId)
			.setIfMissing({ views: 0 })
			.inc({ views: 1 })
			.set({ lastViewedAt: new Date().toISOString() })
			.commit();

		return NextResponse.json({
			success: true,
			views: result.views,
		});
	} catch (error) {
		console.error("Error tracking view:", error);
		return NextResponse.json(
			{ error: "Failed to track view" },
			{ status: 500 },
		);
	}
}
