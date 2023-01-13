import {
    Grid
 } from '@mui/material';
import BookPlan from './BookPlan';
import booksList from './booksList'; 

export default function Books () {
    return (
        <Grid container spacing={.5}>
            {
                booksList.map((book, index) => (
                    <Grid key={index} item xs={12}  md={3} lg={12/5}>
                        <BookPlan
                            coverUrl={book.image}
                            coverSrcSet={book.image}
                            title={book.title}
                            src={book.link}
                        />
                    </Grid>
                ))
            }
        </Grid>
    );
}