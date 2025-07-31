import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from 'date-fns';

interface Comment {
  id: string;
  author_name: string;
  content: string;
  created_at: string;
}

interface CommentsListProps {
  blogPostId: string;
  refreshTrigger: number;
}

const CommentsList: React.FC<CommentsListProps> = ({ blogPostId, refreshTrigger }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('id, author_name, content, created_at')
        .eq('blog_post_id', blogPostId)
        .eq('approved', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [blogPostId, refreshTrigger]);

  if (loading) {
    return <div className="text-center py-4">Loading comments...</div>;
  }

  if (comments.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No comments yet. Be the first to comment!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Comments ({comments.length})</h3>
      {comments.map((comment) => (
        <Card key={comment.id}>
          <CardContent className="pt-4">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium">{comment.author_name}</h4>
              <span className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
              </span>
            </div>
            <p className="text-foreground/90 whitespace-pre-wrap">{comment.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CommentsList;