import { useState, useEffect } from "react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { DialogTitle } from "@/components/ui/dialog";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface SearchResult {
  id: string;
  title: string;
  excerpt?: string;
  slug: string;
  type: 'blog' | 'page';
}

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const searchContent = async () => {
      if (!searchQuery.trim() || searchQuery.length < 2) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        // Search blog posts
        const { data: blogPosts, error: blogError } = await supabase
          .from('blog_posts')
          .select('id, blog_title, excerpt, slug')
          .eq('published', true)
          .or(`blog_title.ilike.%${searchQuery}%,excerpt.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`)
          .limit(10);

        if (blogError) throw blogError;

        // Search site pages
        const { data: sitePages, error: pageError } = await supabase
          .from('site_pages')
          .select('id, title, slug')
          .or(`title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`)
          .limit(5);

        if (pageError) throw pageError;

        const searchResults: SearchResult[] = [
          ...(blogPosts || []).map(post => ({
            id: post.id,
            title: post.blog_title,
            excerpt: post.excerpt,
            slug: post.slug,
            type: 'blog' as const
          })),
          ...(sitePages || []).map(page => ({
            id: page.id,
            title: page.title,
            slug: page.slug,
            type: 'page' as const
          }))
        ];

        setResults(searchResults);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchContent, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleSelect = (result: SearchResult) => {
    if (result.type === 'blog') {
      navigate(`/blog/${result.slug}`);
    } else {
      navigate(`/${result.slug}`);
    }
    onOpenChange(false);
    setSearchQuery("");
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <DialogTitle className="sr-only">Search</DialogTitle>
      <CommandInput
        placeholder="Search articles and pages..."
        value={searchQuery}
        onValueChange={setSearchQuery}
      />
      <CommandList>
        {isLoading && (
          <div className="py-6 text-center text-sm text-muted-foreground">
            Searching...
          </div>
        )}
        {!isLoading && searchQuery && results.length === 0 && (
          <CommandEmpty>No results found for "{searchQuery}"</CommandEmpty>
        )}
        {results.length > 0 && (
          <CommandGroup heading="Results">
            {results.map((result) => (
              <CommandItem
                key={result.id}
                onSelect={() => handleSelect(result)}
                className="flex flex-col items-start gap-1 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  <span className="font-medium">{result.title}</span>
                  <span className="text-xs text-muted-foreground capitalize">
                    {result.type}
                  </span>
                </div>
                {result.excerpt && (
                  <span className="text-xs text-muted-foreground line-clamp-2 ml-6">
                    {result.excerpt}
                  </span>
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
};

export default SearchDialog;