import { Stack } from "@mui/material";
import Link from "./Link";

export default function CopyrightFooter() {
  return (
    <Stack
      display='flex'
      mt={1}
      justifyContent='center'
      alignItems='center'
      spacing={2}
      direction='row'>
      <Link variant='caption' color='text.primary'>
        {"Conditions d'utilisation"}
      </Link>
      <Link variant='caption' color='text.primary'>
        Aide
      </Link>
      <Link component='div' color='text.secondary' variant='caption'>
        DANTIC &copy;2021
      </Link>
    </Stack>
  );
}
