import pubLits from "./pubLits";
import {
    Card,
    CardContent,
    Grid,
} from '@mui/material';
import PubItem from "./PubItem";

export default function Pubs() {
    return (
        <Card
            sx={{
                bgcolor: theme => theme.palette.background.paper + theme.customOptions.opacity,
            }}
            elevation={0}
        >
          <CardContent>
            <Grid container spacing={2}>
                {pubLits.map((pub) => (
                    <Grid item key={pub.title} xs={12} md={6} lg={4} >
                        <PubItem
                            src={pub.src}
                            desc={pub.content}
                            title={pub.title}
                            href={pub.href}
                        />
                    </Grid>
                ))}
            </Grid>
          </CardContent>
        </Card>
    )
}