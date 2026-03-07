import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import { Iconify } from "src/components/iconify";
import { Form, Field } from "src/components/hook-form";
import { useIlanForm } from "../../yeni/ilan-form-hook";
import IconButton from "@mui/material/IconButton";
import { Divider } from "@mui/material";
import { primary } from "src/assets/theme";

export function JobNewEditForm({ newJob }) {
  const {
    methods,
    onSubmit,
    isSubmitting,
    uploadedImages,
    setUploadedImages,
    handleImageUpload,
    handleImageDelete,
    categories,
    handleCategoryChange,
    categoryFeatures,
  } = useIlanForm(newJob);

  const renderDetails = () => (
    <Card spacing={3}>
      <Stack sx={{ p: 3 }} spacing={3}>
        <Stack spacing={1.5}>
          <Typography sx={{ fontSize: 18, fontWeight: 600, color: "#1C252E" }}>Başlık</Typography>
          <Field.Text name="title" placeholder="Örneğin: MACBOOK PRO 16İNCH 2020" />
        </Stack>

        <Stack spacing={1.5}>
          <Typography sx={{ fontSize: 18, fontWeight: 600, color: "#1C252E" }}>Kategori</Typography>
          <Field.Autocomplete
            name="category"
            placeholder="Kategori seçiniz"
            options={categories}
            onChange={(_, value) => {
              methods.setValue("category", value);
              handleCategoryChange(value);
            }}
          />
        </Stack>

        <Stack spacing={1.5}>
          <Typography sx={{ fontSize: 18, fontWeight: 600, color: "#1C252E" }}>Fiyat</Typography>
          <Field.Text
            name="price"
            placeholder="Örneğin: 22000"
            type="number"
            inputProps={{ min: 0 }}
            onChange={(e) => {
              const value = e.target.value;
              methods.setValue("price", value === "" ? "" : Number(value));
            }}
          />
        </Stack>

        <Stack spacing={1.5}>
          <Typography sx={{ fontSize: 18, fontWeight: 600, color: "#1C252E" }}>Açıklama</Typography>
          <Field.Editor name="content" resetValue sx={{ maxHeight: 480 }} />
        </Stack>

        {renderPhotoUpload()}
      </Stack>
      {renderProperties()}
    </Card>
  );

  const renderPhotoUpload = () => {
    const {
      formState: { errors },
      register,
    } = methods;

    return (
      <Stack spacing={1.5}>
        <Typography sx={{ fontSize: 18, fontWeight: 600, color: "#1C252E" }}>
          Fotoğraf Yükle
        </Typography>

        <Box
          component="label"
          htmlFor="image-upload"
          sx={{
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 2.5,
            gap: 2,
            bgcolor: "common.white",
            border: `2px dashed ${errors.images ? "#FF4842" : "#1C252E"}`,
            borderRadius: 1,
            cursor: "pointer",
            "&:hover": {
              opacity: 0.8,
            },
          }}
        >
          <input
            id="image-upload"
            type="file"
            multiple
            accept="image/*"
            {...register("images")}
            onChange={(e) => {
              register("images").onChange(e);
              handleImageUpload(e);
            }}
            style={{ display: "none" }}
          />
          <Iconify
            icon="solar:gallery-add-bold"
            width={32}
            height={32}
            sx={{ color: "success.main", mb: 1 }}
          />
          <Typography variant="subtitle2">Fotoğraf Yükle</Typography>
        </Box>

        {errors.images && (
          <Typography variant="caption" sx={{ color: "error.main", pl: 1 }}>
            {errors.images.message}
          </Typography>
        )}

        {uploadedImages.length > 0 && (
          <Box
            sx={{
              mt: 2.5,
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              gap: 1,
              flexWrap: "wrap",
            }}
          >
            {uploadedImages.map((image, index) => (
              <Box
                key={index}
                sx={{
                  width: 72,
                  height: 72,
                  position: "relative",
                  borderRadius: 1.5,
                  overflow: "hidden",
                }}
              >
                <Box
                  component="img"
                  src={image.url}
                  alt={`Uploaded ${index + 1}`}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: 1,
                  }}
                />

                <IconButton
                  size="small"
                  onClick={() => handleImageDelete(index)}
                  sx={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    width: 28,
                    height: 28,
                    p: 0,
                    color: "common.white",
                    bgcolor: "rgba(0,0,0,0.48)",
                    "&:hover": {
                      bgcolor: "rgba(0,0,0,0.72)",
                    },
                    zIndex: 1,
                  }}
                >
                  <Iconify icon="mingcute:close-line" width={18} height={18} />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}
      </Stack>
    );
  };

  const renderProperties = () => {
    if (!categoryFeatures || categoryFeatures.length === 0) {
      return null;
    }

    return (
      <Card sx={{ mt: 0 }}>
        <Divider />
        <CardHeader
          title="Özellikler"
          sx={{
            p: 3,
            "& .MuiCardHeader-title": {
              fontSize: 18,
              fontWeight: 600,
              color: "#1C252E",
            },
          }}
        />
        <Divider />
        <Stack sx={{ p: 3 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 3,
            }}
          >
            {categoryFeatures.map((feature, index) => (
              <Stack key={index} spacing={1}>
                <Typography variant="subtitle2">{feature.featureName}</Typography>
                <Field.Text
                  name={`features.${feature.id}`}
                  fullWidth
                  placeholder={`${feature.featureName} giriniz`}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1,
                      backgroundColor: "common.white",
                      height: "40px",
                    },
                    "& .MuiOutlinedInput-input": {
                      fontSize: 15,
                    },
                  }}
                />
              </Stack>
            ))}
          </Box>
        </Stack>
      </Card>
    );
  };

  const renderActions = () => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        gap: 2,
        mt: 3,
      }}
    >
      <LoadingButton
        variant="outlined"
        size="large"
        onClick={() => {
          methods.reset();
          methods.setValue("content", "", { shouldValidate: false });
          setUploadedImages([]);
        }}
        sx={{
          bgcolor: "action.disabledBackground",
          color: "#1C252E",
          border: "none",
          "&:hover": {
            border: "none",
            bgcolor: "#919EAB33",
          },
        }}
      >
        İptal
      </LoadingButton>

      <LoadingButton
        type="submit"
        variant="contained"
        size="large"
        loading={isSubmitting}
        sx={{
          bgcolor: primary.main,
          "&:hover": {
            bgcolor: "#00A76F",
          },
        }}
      >
        İlan Oluştur
      </LoadingButton>
    </Box>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Box
        sx={{
          maxWidth: { xs: 720, xl: 1200 },
        }}
      >
        <Stack>{renderDetails()}</Stack>
      </Box>
      {renderActions()}
    </Form>
  );
}
