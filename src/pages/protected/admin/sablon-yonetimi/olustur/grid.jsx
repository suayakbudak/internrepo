import { useState } from "react";
import { Box, Card, CardContent, CardHeader, Paper, Stack } from "@mui/material";
import {
  DndContext,
  DragOverlay,
  useSensors,
  useSensor,
  PointerSensor,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { DashboardContent } from "src/pages/protected/layout";

const aspectVariants = ["1/1", "2/1", "3/3", "3/2", "4/3"];

const randomItems = aspectVariants.map((ratio, index) => ({
  id: `box-${index + 1}`,
  content: ratio.replace("/", ":"),
  aspectRatio: ratio,
}));

const LayoutBuilder = () => {
  const [availableItems, setAvailableItems] = useState(randomItems);

  const [placedItems, setPlacedItems] = useState([]);

  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    setActiveId(null);
    const { active, over } = event;

    if (over && over.id.startsWith("cell-")) {
      const draggedItem = availableItems.find((item) => item.id === active.id);
      if (draggedItem) {
        const cellIndex = parseInt(over.id.split("-")[1]);
        const position = {
          row: Math.floor(cellIndex / GRID_COLUMNS),
          col: cellIndex % GRID_COLUMNS,
        };

        const newItem = {
          ...draggedItem,
          id: `${draggedItem.id}-${Date.now()}`,
          position,
        };

        setPlacedItems([...placedItems, newItem]);
        setAvailableItems(availableItems.filter((item) => item.id !== active.id));
      }
    }
  };

  // Update the DraggableBox component to use aspect ratio
  const DraggableBox = ({ id, children, aspectRatio }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id,
    });

    return (
      <Paper
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        sx={{
          p: 2,
          mb: 1,
          bgcolor: "secondary.light",
          "&:hover": { bgcolor: "secondary.main" },
          cursor: "grab",
          aspectRatio,
          width: aspectRatio ? `${parseInt(aspectRatio.split("/")[0]) * 100}px` : "auto",
          height: aspectRatio ? `${parseInt(aspectRatio.split("/")[1]) * 100}px` : "auto",
          transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        }}
      >
        {children}
      </Paper>
    );
  };

  const GRID_COLUMNS = 12;
  const GRID_ROWS = 8;
  const CELL_SIZE = 50;

  const calculateGridSpan = (aspectRatio) => {
    const [width, height] = aspectRatio.split("/").map(Number);
    return {
      gridColumn: `span ${Math.ceil((width * CELL_SIZE) / CELL_SIZE)}`,
      gridRow: `span ${Math.ceil((height * CELL_SIZE) / CELL_SIZE)}`,
    };
  };

  const DroppableCell = ({ index, children }) => {
    const { setNodeRef, isOver } = useDroppable({
      id: `cell-${index}`,
    });

    return (
      <Box
        ref={setNodeRef}
        sx={{
          border: "1px dashed rgba(0,0,0,0.1)",
          gridColumn: "span 1",
          gridRow: "span 1",
          bgcolor: isOver ? "info.main" : "transparent",
          transition: "background-color 0.2s ease",
          position: "relative",
        }}
      >
        {children}
      </Box>
    );
  };

  const DroppableArea = () => {
    const gridCells = Array.from({ length: GRID_COLUMNS * GRID_ROWS });

    const getGridPosition = (cellIndex) => ({
      row: Math.floor(cellIndex / GRID_COLUMNS),
      col: cellIndex % GRID_COLUMNS,
    });

    return (
      <Box
        sx={{
          minHeight: CELL_SIZE * GRID_ROWS,
          width: "100%",
          display: "grid",
          gridTemplateColumns: `repeat(${GRID_COLUMNS}, ${CELL_SIZE}px)`,
          gridTemplateRows: `repeat(${GRID_ROWS}, ${CELL_SIZE}px)`,
          gap: 1,
          overflow: "auto",
          position: "relative",
        }}
      >
        {gridCells.map((_, index) => (
          <DroppableCell key={index} index={index} />
        ))}

        {placedItems.map((item) => {
          const gridSpan = calculateGridSpan(item.aspectRatio);
          return (
            <Paper
              key={`placed-${item.id}`}
              sx={{
                p: 2,
                bgcolor: "info.dark",
                ...gridSpan,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1,
              }}
            >
              {item.content}
            </Paper>
          );
        })}
      </Box>
    );
  };

  const VisualOverlay = () => {
    const activeItem = availableItems.find((item) => item.id === activeId);
    const aspect = activeItem?.aspectRatio;

    if (!activeId) return null;

    return (
      <DragOverlay>
        <Paper
          sx={{
            p: 2,
            bgcolor: "text.secondary",
            aspectRatio: aspect,
            width: aspect ? `${parseInt(aspect.split("/")[0]) * 100}px` : "auto",
            height: aspect ? `${parseInt(aspect.split("/")[1]) * 100}px` : "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0.4,
          }}
        >
          {activeItem?.content}
        </Paper>
      </DragOverlay>
    );
  };

  return (
    <DashboardContent maxWidth="xl">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToWindowEdges]}
      >
        <Stack direction="row" spacing={3}>
          {/* Left sidebar */}
          <Card sx={{ width: 500 }}>
            <CardHeader title="Available Components" />
            <CardContent>
              <Stack direction="row" flexWrap="wrap" spacing={1.5}>
                {availableItems.map((item) => (
                  <DraggableBox key={item.id} id={item.id} aspectRatio={item.aspectRatio}>
                    {item.content}
                  </DraggableBox>
                ))}
              </Stack>
            </CardContent>
          </Card>

          {/* Right drop zone area */}
          <Card sx={{ flex: 1 }}>
            <CardHeader title="Layout Area" />
            <CardContent>
              <DroppableArea />
            </CardContent>
          </Card>

          <VisualOverlay />
        </Stack>
      </DndContext>
    </DashboardContent>
  );
};

export default LayoutBuilder;
