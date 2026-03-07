import { forwardRef } from "react";
import { mergeClasses } from "minimal-shared/utils";

import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

import { fileThumbnailClasses } from "./classes";
import { fileData, fileThumb, fileFormat } from "./utils";
import { RemoveButton, DownloadButton } from "./action-buttons";

// ----------------------------------------------------------------------

export const FileThumbnail = forwardRef((props, ref) => {
  const { file, tooltip, onRemove, imageView, slotProps, onDownload, className, sx, ...other } =
    props;

  const { icon, removeBtn, downloadBtn, tooltip: tooltipProps } = slotProps ?? {};

  const { name, path } = fileData(file);

  const previewUrl =
    typeof file === "string"
      ? file
      : file instanceof File
        ? URL.createObjectURL(file)
        : file?.url || "";

  const format = file?.type?.toLowerCase() === "folder" ? "folder" : fileFormat(path ?? name ?? "");

  const getIconPath = () => {
    if (format === "folder") {
      return "/assets/icons/files/ic-folder.svg";
    }
    return fileThumb(format);
  };

  const renderItem = () => (
    <ItemRoot
      ref={ref}
      className={mergeClasses([fileThumbnailClasses.root, className])}
      sx={sx}
      {...other}
    >
      {format === "image" && imageView && previewUrl ? (
        <ItemImg src={previewUrl} className={fileThumbnailClasses.img} {...slotProps?.img} />
      ) : (
        <ItemIcon src={getIconPath()} className={fileThumbnailClasses.icon} {...icon} />
      )}

      {onRemove && (
        <RemoveButton
          onClick={onRemove}
          className={fileThumbnailClasses.removeBtn}
          {...removeBtn}
        />
      )}

      {onDownload && (
        <DownloadButton
          onClick={onDownload}
          className={fileThumbnailClasses.downloadBtn}
          {...downloadBtn}
        />
      )}
    </ItemRoot>
  );

  if (tooltip) {
    return (
      <Tooltip
        arrow
        title={name}
        {...tooltipProps}
        slotProps={{
          ...tooltipProps?.slotProps,
          popper: {
            modifiers: [
              {
                name: "offset",
                options: { offset: [0, -12] },
              },
            ],
            ...tooltipProps?.slotProps?.popper,
          },
        }}
      >
        {renderItem()}
      </Tooltip>
    );
  }

  return renderItem();
});

// ----------------------------------------------------------------------

const ItemRoot = styled("span")(({ theme }) => ({
  width: 36,
  height: 36,
  flexShrink: 0,
  alignItems: "center",
  position: "relative",
  display: "inline-flex",
  justifyContent: "center",
  borderRadius: theme.shape.borderRadius * 1.25,
}));

const ItemIcon = styled("img")(() => ({
  width: "100%",
  height: "100%",
}));

const ItemImg = styled("img")(() => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "inherit",
}));
