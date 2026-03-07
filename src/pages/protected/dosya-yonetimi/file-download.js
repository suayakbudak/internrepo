import JSZip from "jszip";
import { saveAs } from "file-saver";
import { toast } from "src/components/snackbar";

export async function downloadFileOrFolder(item) {
  try {
    if (item.type === "folder") {
      await downloadFolder(item);
    } else {
      await downloadFile(item);
    }
    toast.success("İndirme başlatıldı");
  } catch (error) {
    console.error("İndirme hatası:", error);
    toast.error("İndirme hatası");
  }
}

async function downloadFile(file) {
  const fileUrl = file.url || file.preview;
  if (!fileUrl) {
    throw new Error("Dosya URL bulunamadı");
  }

  const response = await fetch(fileUrl);
  const blob = await response.blob();
  saveAs(blob, file.name);
}

async function downloadFolder(folder) {
  if (!folder.files?.length) {
    throw new Error("Klasörde dosya bulunamadı");
  }

  const zip = new JSZip();

  const filePromises = folder.files.map(async (file) => {
    try {
      const response = await fetch(file.url || file.preview);
      const blob = await response.blob();
      zip.file(file.name || file.path, blob);
    } catch (error) {
      console.error(`Klasörde dosya eklenirken bir hata oluştu: ${file.name}`, error);
    }
  });

  await Promise.all(filePromises);

  const zipContent = await zip.generateAsync({ type: "blob" });
  saveAs(zipContent, `${folder.name}.zip`);
}
