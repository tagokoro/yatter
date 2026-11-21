import { Timeline } from "@/components/Timeline";
import { YweetCard } from "@/components/YweetCard";

/**
 * タイムライン（ホーム）
 * docs/02_timeline.md を見ながら、ここで API から Yweet を取得して表示する
 */


type Yweet = {
  id: number;
  content: string;
  user: {
    username: string;
  };
};

// レスポンスは配列そのもの
type TimelineResponse = Yweet[];
export default async function Home() {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/v1/timelines/public");
  
  const yweets = (await res.json()) as TimelineResponse;
  return <Timeline>{yweets.map((yweet) => (
    <YweetCard key={yweet.id} username={yweet.user.username} content={yweet.content} />
  ))}</Timeline>;
}
