import { AgGridReact } from "ag-grid-react";
import { data } from "@org/ag-data";
import { useMemo, useState } from "react";

import "ag-grid-enterprise/dist/styles/ag-grid.css";
import "ag-grid-enterprise/dist/styles/ag-theme-balham.css";
import { ColDef, ColGroupDef } from "ag-grid-community";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";


function numberParser(params) {
  return parseInt(params.newValue);
}

export default function Web() {
  const [columnDefs, setColumnDefs] = useState<(ColDef | ColGroupDef)[]>([
    {
      field: "state",
      type: "dimension",
      rowGroup: true,
      cellRenderer: "agGroupCellRenderer",
      showRowGroup: true,
    },
    { field: "city", type: "dimension" },
    {
      field: "country",
      type: "dimension",
      minWidth: 200,
    },
    { field: "val1", type: "numberValue" },
    { field: "val2", type: "numberValue" },
  ]);

  const autoGroupColumnDef = useMemo(() => {
    return {
      field: "state",
      minWidth: 200,
    };
  }, []);
  const columnTypes = useMemo(() => {
    return {
      numberValue: {
        enableValue: true,
        aggFunc: "sum",
        editable: true,
        valueParser: numberParser,
      },
      dimension: {
        enableRowGroup: true,
        enablePivot: true,
      },
    };
  }, []);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 150,
      resizable: true,
    };
  }, []);

  return (
    <div style={{ height: "100vh" }} className="ag-theme-balham">
      <h1>Ag grid 27</h1>
      <AgGridReact
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        autoGroupColumnDef={autoGroupColumnDef}
        columnTypes={columnTypes}
        groupMaintainOrder
        groupAllowUnbalanced
        groupDisplayType="groupRows"
        animateRows
        rowData={data}
        modules={[RowGroupingModule]}
      />
    </div>
  );
}
