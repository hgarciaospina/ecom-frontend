import { useEffect, useTransition } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchProducts } from "../store/actions";

const useProductFilter = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  // 🧠 Initialize React transition for non-blocking updates
  const [_, startTransition] = useTransition();

  useEffect(() => {
    const params = new URLSearchParams();

    const currentPage = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1;

    params.set("pageNumber", currentPage - 1);

    const sortOrder = searchParams.get("sortby") || "asc";
    const categoryParams = searchParams.get("category") || null;
    const keyword = searchParams.get("keyword") || null;

    params.set("sortBy", "price");
    params.set("sortOrder", sortOrder);

    if (categoryParams) {
      params.set("category", categoryParams);
    }

    if (keyword) {
      params.set("keyword", keyword);
    }

    const queryString = params.toString();
    console.log("QUERY STRING", queryString);

    /**
     * DEFER HEAVY DISPATCH:
     * Postpone dispatch to avoid blocking the thread during rendering or interactions.
     *
     * ✅ REPLACED setTimeout(...) with startTransition(...)
     *    - Improves responsiveness
     *    - Prevents [Violation] 'setTimeout' handler took <N>ms
     */
    startTransition(() => {
      dispatch(fetchProducts(queryString));
    });

  }, [dispatch, searchParams]);
};

export default useProductFilter;
