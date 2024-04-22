import Page from "@/components/Page";
import { Box, SxProps, TabsProps, Theme } from "@mui/material";
import React, { PropsWithChildren, useEffect, cloneElement } from "react";
import TrTab from "../Tab";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DragDropContextProps,
} from "react-beautiful-dnd";

const styleSheet: SxProps<Theme> = (theme) => ({
  display: "flex",
  height: "40px",
  width: "100%",
  padding: "4px 18px",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  position: "relative",
});

type TrTabsProps = Omit<TabsProps, "onClick" | "onChange"> & {
  items: AppTag[];
  namespace?: string;
  onDragEndHandler?: DragDropContextProps["onDragEnd"];
  onChange?: (v: number) => void;
};

export default function TrTabs({
  items,
  value,
  namespace = "default",
  onDragEndHandler,
  onChange,
}: PropsWithChildren<TrTabsProps>) {
  function onTabClick(e: any, index: number) {
    onChange && onChange(index);
  }

  return (
    <DragDropContext
      onDragEnd={(...props) => onDragEndHandler && onDragEndHandler(...props)}
    >
      <Droppable droppableId="droppable" direction="horizontal">
        {(provided, snapshot) => (
          <Box
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="tr-tabs"
            sx={styleSheet}
          >
            {items.map((item, index) => (
              <Draggable key={item.key} draggableId={item.key} index={index}>
                {(provided, snapshot) => {
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TrTab
                        onMouseDown={(e) => onTabClick(e, index)}
                        tag={item}
                        namespace={namespace}
                        className={value === index ? "active" : undefined}
                      >
                        {item.title}
                      </TrTab>
                    </div>
                  );
                }}
              </Draggable>
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
}
