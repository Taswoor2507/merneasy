const getAllProducts = (req, res, next) => {
  res.status(200).json({
    message: "all is oky",
  });
};

export { getAllProducts };
