import { Button, Container, Text, TextInput, Title } from "@mantine/core";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "../../auth/pages/AuthContext";
import { useUpdateUser } from "../hooks/useUpdateUser";

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

function Settings() {
  const auth = useAuth();
  const user = auth?.user;

  const { mutate: updateUser, isPending, isSuccess } = useUpdateUser();

  const { register, handleSubmit, formState: { errors, isDirty } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName ?? "emilys",
      lastName: user?.lastName ?? "",
      email: user?.email ?? "",
    },
  });

  function onSubmit(data: ProfileFormData) {
    if (!user) return;
    updateUser({
      userId: user.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    });
  }

  if (!user) {
    return (
      <Container size="md" py="xl">
        <Text>Please log in first</Text>
      </Container>
    );
  }

  return (
    <Container size="md" py="xl">
      <Title order={1} mb="xl">Settings</Title>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="First Name"
          mb="md"
          {...register("firstName")}
          error={errors.firstName?.message}
        />

        <TextInput
          label="Last Name"
          mb="md"
          {...register("lastName")}
          error={errors.lastName?.message}
        />

        <TextInput
          label="Email"
          mb="md"
          {...register("email")}
          error={errors.email?.message}
        />

        <Button type="submit" loading={isPending} color="gray" disabled={!isDirty}>
          Save Changes
        </Button>

        {isSuccess && (
          <Text c="green" mt="md">Profile updated successfully!</Text>
        )}
      </form>
    </Container>
  );
}

export default Settings;
