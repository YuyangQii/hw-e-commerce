import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../api";

export function useUpdateUser() {
  return useMutation({
    mutationFn: function (data: { userId: number; firstName: string; lastName: string; email: string }) {
      return updateUser(data.userId, data.firstName, data.lastName, data.email);
    },
  });
}
