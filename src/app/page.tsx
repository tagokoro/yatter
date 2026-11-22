import { Timeline } from "@/components/Timeline";
import { TimelineFeed } from "@/components/TimelineFeed";

/**
 * タイムライン（ホーム）
 * docs/02_timeline.md を見ながら、ここで API から Yweet を取得して表示する
 */

import type { Yweet } from "@/types/yweet";

// レスポンスは配列そのもの
export default async function Home() {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/v1/timelines/public");

  const yweets = (await res.json()) as Yweet[];
  return (
    <Timeline>
      <TimelineFeed initialYweets={yweets} />
    </Timeline>
  )
}
