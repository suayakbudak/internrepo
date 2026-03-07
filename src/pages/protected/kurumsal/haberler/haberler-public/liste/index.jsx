import { Helmet } from "react-helmet-async";

import { CONFIG } from "src/global-config";
import { useGetPosts } from "src/lib/actions/blog";

import { PostListHomeView } from "./view";

// ----------------------------------------------------------------------

const metadata = { title: `Post list - ${CONFIG.appName}` };

export default function Page() {
  const { posts, postsLoading } = useGetPosts();

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <PostListHomeView posts={posts} loading={postsLoading} />
    </>
  );
}
