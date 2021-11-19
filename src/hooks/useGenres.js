const useGenre = (selectedGenres) => {
  if (selectedGenres.length < 1) return "";

  const genresID = selectedGenres.map((g) => g.id);
  return genresID.reduce((acc, curr) => acc + "," + curr);
};

export default useGenre;
