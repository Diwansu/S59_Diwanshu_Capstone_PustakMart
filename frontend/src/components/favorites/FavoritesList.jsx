import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Grid } from '@mui/material';
import { fetchFavorites } from '../../features/favorites/favoriteSlice';
import FavoriteItem from './FavoriteItem';
import LoadingSpinner from '../common/LoadingSpinner';

const FavoritesList = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(state => state.favorites);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  if (loading) return <LoadingSpinner />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        My Favorites
      </Typography>
      {items.length === 0 ? (
        <Typography>No favorite books yet</Typography>
      ) : (
        <Grid container spacing={3}>
          {items.map(item => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
              <FavoriteItem item={item} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default FavoritesList;
