import { _mock } from "src/_mock";

// To get the user from the <AuthContext/>, you can use

// Change:
// import { useMockedUser } from 'src/hooks/use-mocked-user';
// const { user } = useMockedUser();

// To:
// import { useAuthContext } from "src/context/auth-context";
// const { user } = useAuthContext();

// ----------------------------------------------------------------------

export function useMockedUser() {
  const user = {
    id: "8864c717-587d-472a-929a-8e5f298024da-0",
    displayName: "Demo Kullanıcı",
    email: "demo@sirketiniz.com",
    photoURL: _mock.image.avatar(24),
    phoneNumber: _mock.phoneNumber(1),
    country: _mock.countryNames(1),
    address: "90210 Broadway Blvd",
    state: "California",
    city: "San Francisco",
    zipCode: "94116",
    about: "Merhaba, profilime hoşgeldin!",
    role: "admin",
    isPublic: true,
  };

  return { user };
}
