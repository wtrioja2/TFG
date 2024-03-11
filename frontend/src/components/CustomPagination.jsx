import React from "react";
import { Pagination } from "@mui/material";

export default function CustomPagination({
    meta,
    onPageChange,
}) {
    const handleChange = (event, value) => {
        onPageChange(value);
    };

    return (
        <Pagination
            count={meta.last_page || 1}
            page={meta.current_page || 1}
            onChange={handleChange}
            color="primary"
            shape="rounded"
            size="large"
            showFirstButton
            showLastButton
        />
    );
}