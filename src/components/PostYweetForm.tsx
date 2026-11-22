'use client'


import { Button } from "@/components/Button";
import { Textarea } from "@/components/Textarea";
import type { Yweet } from "@/types/yweet";
import React, { useState } from "react";
import { useAuth } from "@/auth/AuthProvider";

type PostYweetFormProps = {
    onPosted: (yweet: Yweet) => void;
};

export function PostYweetForm({ onPosted }: PostYweetFormProps) {
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (content.trim() == "") {
            setError("本文を入力してください");
            return;
        }
        const authentication = getAuthenticationHeader();
        if (!authentication) {
            setError("投稿するにはログインが必要です");
            return;
        }
        setError("");
        setIsSubmitting(true);
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/yweets`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authentication: authentication,
                    },
                    body: JSON.stringify({
                        yweet: content,
                    })
                }
            );
            if (!res.ok) {
                setError("投稿に失敗しました");
                return;
            }

            const created = (await res.json()) as Yweet;
            onPosted(created);
            setContent("");
        } finally {
            setIsSubmitting(false);
        }
    }

    const { getAuthenticationHeader } = useAuth()
    return (
        <form
            className="flex flex-col gap-3 py-3 px-4 border-b border-glay-200"
            onSubmit={handleSubmit}
        >
            <Textarea
                name="yweet"
                placeholder="いまどうしてる？"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>投稿する</Button>
            </div>
        </form>

    )
}
