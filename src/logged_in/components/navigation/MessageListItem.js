import React from "react";
import PropTypes from "prop-types";
import { ListItem, ListItemText } from "@material-ui/core";
import formatDistance from "date-fns/formatDistance";

function MessageListItem(props) {
  const { message, divider } = props;

  return (
    <ListItem divider={divider}>
      <ListItemText
        primary={`#${message.ticketID} ha sido actualizado a **${message.toStatus}**.`}
        secondary={`${formatDistance(
          new Date(message.changed_at),
          new Date()
        )} ago`}
      />
    </ListItem>
  );
}

MessageListItem.propTypes = {
  message: PropTypes.object.isRequired,
  divider: PropTypes.bool,
};

export default MessageListItem;
