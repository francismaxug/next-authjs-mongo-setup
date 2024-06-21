const users = [
  {
    email: "francisMax@gmail.com",
    password: "password1",
  },
  {
    email: "max@gmail.com",
    password: "password2",
  },
  {
    email: "bob@email.com",
    password: "password",
  },
]

export const getUserByEmail = (email: string) => {
  const found = users.find((user) => user.email === email)
  return found
}
