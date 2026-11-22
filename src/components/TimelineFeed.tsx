"use client"

import { useState } from "react";
import { YweetCard } from "@/components/YweetCard";
import type { Yweet } from "@/types/yweet";
import { useAuth } from "@/auth/AuthProvider";
import { PostYweetForm } from "@/components/PostYweetForm";

type TimelineFeedProps = {
    initialYweets: Yweet[];
}

export function TimelineFeed({ initialYweets }: TimelineFeedProps) {
    const { user } = useAuth();
    const isLoggedIn = !!user
    const [yweets, setYweets] = useState<Yweet[]>(initialYweets);
    function handlePosted(created: Yweet) {
        setYweets((prev) => [created, ...prev]);
    }
    return (
        <>
            {isLoggedIn && <PostYweetForm onPosted={handlePosted} />}
            {yweets.length == 0 ? (
                <p className="py-8 px-4 text-sm text-center text-gray-500">
                    まだ Yweet がありません
                </p>
            ) : (
                yweets.map((yweet) => (
                    <YweetCard
                        key={yweet.id}
                        username={yweet.user.username}
                        content={yweet.content}
                        avatarUrl={yweet.user.avatar}
                    />
                ))
            )}
        </>
    )
}
