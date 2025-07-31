import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface CommentFormProps {
  blogPostId: string;
  onCommentSubmitted: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ blogPostId, onCommentSubmitted }) => {
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!authorName.trim() || !authorEmail.trim() || !content.trim()) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('comments')
        .insert({
          blog_post_id: blogPostId,
          author_name: authorName.trim(),
          author_email: authorEmail.trim(),
          content: content.trim(),
        });

      if (error) throw error;

      toast({
        title: "Comment submitted successfully!",
        description: "Your comment is pending approval and will appear soon.",
      });

      setAuthorName('');
      setAuthorEmail('');
      setContent('');
      onCommentSubmitted();
    } catch (error) {
      console.error('Error submitting comment:', error);
      toast({
        title: "Failed to submit comment",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leave a Comment</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                placeholder="Your Name"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                required
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Your Email"
                value={authorEmail}
                onChange={(e) => setAuthorEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <Textarea
            placeholder="Write your comment..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            required
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Comment'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CommentForm;