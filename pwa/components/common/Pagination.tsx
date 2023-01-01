import Link from "next/link";
import { PagedCollection } from "../../types/collection";

interface Props {
  collection: PagedCollection<unknown>;
}

const Pagination = ({ collection }: Props) => {
  const view = collection && collection["hydra:view"];
  if (!view) return null;

  const {
    "hydra:first": first,
    "hydra:previous": previous,
    "hydra:next": next,
    "hydra:last": last,
  } = view;

  return (
    <div className="text-center">
      <nav
        className="text-xs font-bold inline-flex mx-auto divide-x-2 divide-gray-200 flex-row flex-wrap items-center justify-center mb-4 border-2 border-gray-200 rounded-2xl overflow-hidden"
        aria-label="Page navigation"
      >
        <Link
          href={first ? first : "#"}
          className={`text-black p-3 hover:text-cyan-500 hover:bg-cyan-50 ${
            previous ? "" : " text-gray-500 pointer-events-none"
          }`}
          aria-label="First page"
        >
          <div>
          <span aria-hidden="true">&lArr;</span> First
          </div>
        </Link>
        <Link
          href={previous ? previous : "#"}
          className={`text-black p-3 hover:text-cyan-500 hover:bg-cyan-50 ${
            previous ? "" : " text-gray-500 pointer-events-none"
          }`}
          aria-label="Previous page"
        >
          <div>
          <span aria-hidden="true">&larr;</span> Previous
          </div>
        </Link>
        <Link
          href={next ? next : "#"}
          className={`text-black p-3 hover:text-cyan-500 hover:bg-cyan-50 ${
            next ? "" : " text-gray-500 pointer-events-none"
          }`}
          aria-label="Next page"
        >
        <div>
          Next <span aria-hidden="true">&rarr;</span>
        </div>
        </Link>
        <Link
          href={last ? last : "#"}
          className={`text-black p-3 hover:text-cyan-500 hover:bg-cyan-50 ${
            next ? "" : "text-gray-500 pointer-events-none"
          }`}
          aria-label="Last page"
        >
          <div>
          Last <span aria-hidden="true">&rArr;</span>
          </div>
        </Link>
      </nav>
    </div>
  );
};

export default Pagination;
