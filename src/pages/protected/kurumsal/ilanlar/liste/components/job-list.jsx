import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Pagination, { paginationClasses } from "@mui/material/Pagination";
import { paths } from "src/routes/paths";
import JobItem from "./job-item";
import { idParam } from "src/routes/param";

export function JobList({ jobs, currentPage, onPageChange }) {
  const [selectedCardId, setSelectedCardId] = useState(null);
  const cardRefs = useRef({});

  const handleCardClick = (id) => {
    setSelectedCardId(id);
  };

  useEffect(() => {
    if (selectedCardId && cardRefs.current[selectedCardId]) {
      setTimeout(() => {
        cardRefs.current[selectedCardId].scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 200);
    }
  }, [selectedCardId]);

  return (
    <>
      <Box
        sx={{
          gap: 3,
          display: "grid",
          gridTemplateColumns: { xs: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
        }}
      >
        {jobs.map((job, jobIndex) => (
          <JobItem
            key={job.id}
            job={job}
            isSelected={selectedCardId === job.id}
            onCardClick={handleCardClick}
            editHref={idParam(paths.anasayfa.kurumsal.ilanlar.duzenle, job.id)}
            detailsHref={idParam(paths.anasayfa.kurumsal.ilanlar.details, job.id)}
            ref={(el) => (cardRefs.current[job.id] = el)}
          />
        ))}
      </Box>

      <Pagination
        page={currentPage}
        onChange={onPageChange}
        count={8}
        sx={{
          mt: { xs: 8, md: 8 },
          [`& .${paginationClasses.ul}`]: { justifyContent: "center" },
        }}
      />
    </>
  );
}
