
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Modal } from "bootstrap";

function InfoModal() {
  <Modal open={true}>
    <Box>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Text in a modal
      </Typography>
    </Box>
  </Modal>;
}
export default InfoModal;
