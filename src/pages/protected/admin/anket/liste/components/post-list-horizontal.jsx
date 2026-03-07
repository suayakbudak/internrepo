import Box from "@mui/material/Box";
import Pagination, { paginationClasses } from "@mui/material/Pagination";

import { paths } from "src/routes/paths";

import { PostItemSkeleton } from "./post-skeleton";
import { PostItemHorizontal } from "./post-item-horizontal";
import { titleParam } from "src/routes/param";

// ----------------------------------------------------------------------

export function PostListHorizontal({ posts, loading }) {
  const renderLoading = () => <PostItemSkeleton variant="horizontal" />;

  const renderList = () =>
    posts.map((post) => (
      <PostItemHorizontal
        key={post.id}
        post={post}
        detailsHref={titleParam(paths.anasayfa.kurumsal.haberler.details, post.title)}
        editHref={titleParam(paths.anasayfa.kurumsal.haberler.duzenle, post.title)}
      />
    ));

  return (
    <>
      <Box
        sx={{
          gap: 3,
          display: "grid",
          gridTemplateColumns: { xs: "repeat(1, 1fr)", md: "repeat(2, 1fr)" },
        }}
      >
        {loading ? renderLoading() : renderList()}
      </Box>

      {posts.length > 8 && (
        <Pagination
          count={8}
          sx={{
            mt: { xs: 5, md: 8 },
            [`& .${paginationClasses.ul}`]: { justifyContent: "center" },
          }}
        />
      )}
    </>
  );
}
