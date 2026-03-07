import { z as zod } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isValidPhoneNumber } from "react-phone-number-input/input";

import { toast } from "src/components/snackbar";
import { schemaHelper } from "src/components/hook-form";

import { useMockedUser } from "src/hooks/use-mocked-user";

export const UpdateUserSchema = zod.object({
  displayName: zod.string().min(1, { message: "İsim gerekli!" }),
  email: zod
    .string()
    .min(1, { message: "E-posta gereklidir!" })
    .email({ message: "Geçerli bir e-posta adresi olmalıdır!" }),
  photoURL: schemaHelper.file({ message: "Fotoğraf gereklidir!" }),
  phoneNumber: schemaHelper.phoneNumber({ isValid: isValidPhoneNumber }),
  phoneNumberInternal: schemaHelper.phoneNumber({ isValid: isValidPhoneNumber }),
  about: zod.string().min(1, { message: "Hakkında kısmı gereklidir!" }),
});

export function useProfileForm() {
  const { user } = useMockedUser();

  const currentUser = {
    displayName: user?.displayName,
    email: user?.email,
    photoURL: user?.photoURL,
    phoneNumber: user?.phoneNumber,
    phoneNumberInternal: user?.phoneNumber,
    about: user?.about,
  };

  const methods = useForm({
    mode: "all",
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: currentUser,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast.success("Kaydetme başarılı!");
      console.info("VERİLER", data);
    } catch (error) {
      console.error(error);
    }
  });

  return { methods, onSubmit, isSubmitting };
}
