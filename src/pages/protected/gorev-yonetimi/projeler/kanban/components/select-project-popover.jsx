import { MenuItem, MenuList } from "@mui/material";
import { CustomPopover } from "src/components/custom-popover";
import { useFetch } from "src/hooks/getters/use-fetch";
import { endpoints } from "src/lib/endpoints";
import { useRouter } from "src/routes/hooks";
import { idsParam } from "src/routes/param";
import { paths } from "src/routes/paths";

export function SelectProjectPopover({ open, anchorEl, onClose }) {
  const { data: projectsData } = useFetch(endpoints.get.projects.root);
  const router = useRouter();

  if (!projectsData) return null;
  const { data: projects } = projectsData;

  return (
    <CustomPopover open={open} anchorEl={anchorEl} onClose={onClose}>
      <MenuList>
        {projects.map((project) => (
          <MenuItem
            key={project.id}
            onClick={() => {
              router.push(
                idsParam(paths.anasayfa.gorevYonetimi.projeler.kanban, [
                  project.id,
                  project.board.id,
                ])
              );
              onClose();
            }}
          >
            {project.name}
          </MenuItem>
        ))}
      </MenuList>
    </CustomPopover>
  );
}
