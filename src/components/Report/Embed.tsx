import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Loading from "components/Loading";
import { Error } from "components/Exceptions";
import { ReportService } from "components/Report";

const SERVER_URL = process.env.REACT_APP_EMBED_SERVER_URL;

type propsType = {
  instanceId: number;
};

const defaultState = {
  hash: "",
  loading: false,
  error: ""
};

const Embed = (props: propsType) => {
  const { instanceId } = props;
  const [state, setState] = useState(defaultState);

  useEffect(() => {
    async function fetchHashCode(instanceId: number) {
      setState(state => ({ ...state, loading: true, error: "" }));
      try {
        const hash = await ReportService.fetchEmbedHash(instanceId);
        setState(state => ({ ...state, hash, loading: false }));
      } catch (error) {
        setState(state => ({
          ...state,
          error: "خطای ارتباط با سرور",
          loading: false
        }));
      }
    }

    fetchHashCode(instanceId);
  }, [instanceId]);

  const copyToClipboard = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const textArea = document.getElementById(
      "text-area-code"
    ) as HTMLTextAreaElement;
    textArea.select();
    // textAreaRef.current!.select();
    document.execCommand("copy");
  };

  const embedText = `<iframe src="${SERVER_URL}?id=${instanceId}&hash=${state.hash}" style="width: 100%; height: 100%; display: block; border: none"></iframe>`;

  if (state.loading) {
    return <Loading />;
  }

  return (
    <Error error={state.error}>
      <Grid container spacing={1}>
        <Grid item sm={12}>
          <TextField
            multiline
            fullWidth
            rows="6"
            value={embedText}
            variant="outlined"
            InputProps={{ readOnly: true }}
            inputProps={{ id: "text-area-code" }}
            style={{ direction: "ltr" }}
          />
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={copyToClipboard} color="primary">
            کپی
          </Button>
        </Grid>
      </Grid>
    </Error>
  );
};

export default Embed;
