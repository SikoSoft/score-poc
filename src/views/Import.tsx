import React, { ReactElement } from "react";
import { ExcelDropzone, ExcelRow } from "../excel-dropzone";
import { useReduxDispatch } from "../store/hooks";
import { importData } from "../store/leaderboard";
import { useToast } from "@northlight/ui";

function Import(): ReactElement {
  const toast = useToast();
  const dispatch = useReduxDispatch();

  function handleSheetData(data: ExcelRow[]) {
    console.log({ data });

    if (
      !data.every((row) => row.name !== undefined && row.score !== undefined)
    ) {
      toast({
        title: "Uh-oh!",
        variant: "error",
        description: "Something went wrong when trying to import data.",
      });
      return;
    }

    dispatch(importData(data));
    toast({
      title: "Imported!",
      description: "The data has been imported successfully.",
    });
  }

  return (
    <>
      <ExcelDropzone
        onSheetDrop={handleSheetData}
        label="Import excel file here"
      />
    </>
  );
}

export default Import;
