import { Request } from "express";

export const getPagination = (req: Request) => {
 const page = Number(req.query.page) || 1;
 const limit = Number(req.query.limit) || 10;
 const skip = (page - 1) * limit;

 return {
  page,
  limit,
  skip
 };
};

export const getPaginatedResponse = (
  req: Request,
  total: number,
  page: number,
  limit: number,
  data: any
) => {
  const totalPages = Math.ceil(total / limit);

  const getUrl = (p: number) => {
    const protocol = req.protocol;
    const host = req.get("host");   
    const url = new URL(`${protocol}://${host}${req.originalUrl}`);
    url.searchParams.set("page", p.toString());
    url.searchParams.set("limit", limit.toString());
    return url.toString();
  };

  const next = page < totalPages ? getUrl(page + 1) : null;
  const previous = page > 1 ? getUrl(page - 1) : null;

  return {
    success: true,
    meta: {
      count: total,
      next,
      previous,
      page,
      limit
    },
    data
  };
};