import React, { memo, useCallback, useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import Routing from "./Routing";
import NavBar from "./navigation/NavBar";
import ConsecutiveSnackbarMessages from "../../shared/components/ConsecutiveSnackbarMessages";
import smoothScrollTop from "../../shared/functions/smoothScrollTop";
import persons from "../dummy_data/persons";
import LazyLoadAddBalanceDialog from "./dashboard/AddTicketInfo";
import LazyLoadTicketDetailDialog from "./dashboard/ticketDetails/DetailModalInfo";
import { getNotifications, getTickets, updateTicketStatus } from "../../api";

const styles = (theme) => ({
  main: {
    marginLeft: theme.spacing(9),
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    },
  },
});

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function Main(props) {
  const { classes, history } = props;
  const [selectedTab, setSelectedTab] = useState(null);
  const [CardChart, setCardChart] = useState(null);
  const [hasFetchedCardChart, setHasFetchedCardChart] = useState(false);
  const [EmojiTextArea, setEmojiTextArea] = useState(null);
  const [hasFetchedEmojiTextArea, setHasFetchedEmojiTextArea] = useState(false);
  const [ImageCropper, setImageCropper] = useState(null);
  const [hasFetchedImageCropper, setHasFetchedImageCropper] = useState(false);
  const [Dropzone, setDropzone] = useState(null);
  const [hasFetchedDropzone, setHasFetchedDropzone] = useState(false);
  const [DateTimePicker, setDateTimePicker] = useState(null);
  const [hasFetchedDateTimePicker, setHasFetchedDateTimePicker] = useState(
    false
  );
  const [tickets, setTickets] = useState([]);
  const [statistics, setStatistics] = useState({ views: [], profit: [] });
  const [posts, setPosts] = useState([]);
  const [targets, setTargets] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isAccountActivated, setIsAccountActivated] = useState(false);
  const [isAddBalanceDialogOpen, setIsAddBalanceDialogOpen] = useState(false);
  const [ticketDetailsOpen, setTicketDetailsOpen] = useState(false);
  const [ticketDetails, setTicketDetails] = useState();
  const [pushMessageToSnackbar, setPushMessageToSnackbar] = useState(null);

  const fetchRandomTargets = useCallback(() => {
    const targets = [];
    for (let i = 0; i < 35; i += 1) {
      const randomPerson = persons[Math.floor(Math.random() * persons.length)];
      const target = {
        id: i,
        number1: Math.floor(Math.random() * 251),
        number2: Math.floor(Math.random() * 251),
        number3: Math.floor(Math.random() * 251),
        number4: Math.floor(Math.random() * 251),
        name: randomPerson.name,
        profilePicUrl: randomPerson.src,
        isActivated: Math.round(Math.random()) ? true : false,
      };
      targets.push(target);
    }
    setTargets(targets);
  }, [setTargets]);

  const openAddBalanceDialog = useCallback(() => {
    setIsAddBalanceDialogOpen(true);
  }, [setIsAddBalanceDialogOpen]);

  const closeAddBalanceDialog = useCallback(() => {
    setIsAddBalanceDialogOpen(false);
  }, [setIsAddBalanceDialogOpen]);

  const openTicketDetails = useCallback(
    (ticket) => {
      setTicketDetails(ticket);
      setTicketDetailsOpen(true);
    },
    [setTicketDetailsOpen]
  );
  const closeTicketDetails = useCallback(() => {
    setTicketDetailsOpen(false);
  }, [setTicketDetailsOpen]);

  const fetchRandomStatistics = useCallback(() => {
    const statistics = { profit: [], views: [] };
    const iterations = 300;
    const oneYearSeconds = 60 * 60 * 24 * 365;
    let curProfit = Math.round(3000 + Math.random() * 1000);
    let curViews = Math.round(3000 + Math.random() * 1000);
    let curUnix = Math.round(new Date().getTime() / 1000) - oneYearSeconds;
    for (let i = 0; i < iterations; i += 1) {
      curUnix += Math.round(oneYearSeconds / iterations);
      curProfit += Math.round((Math.random() * 2 - 1) * 10);
      curViews += Math.round((Math.random() * 2 - 1) * 10);
      statistics.profit.push({
        value: curProfit,
        timestamp: curUnix,
      });
      statistics.views.push({
        value: curViews,
        timestamp: curUnix,
      });
    }
    setStatistics(statistics);
  }, [setStatistics]);

  const fetchRandomTickets = useCallback(() => {
    const tickets = [];
    const iterations = 100;
    const oneMonthSeconds = Math.round(60 * 60 * 24 * 30.5);
    const ticketTemplates = [
      {
        // id: 1,
        title: "Problem reloading",
        status: "In Progress",
        responsible: "Admin Denys",
        description:
          "Al dar enter la pagina se friza y no funciona hasta dar f5",
        type: "Erro de qUi",
        priority: "3",
        creationDate: "12/04/2021",
        finishDate: "12/05/2021",
      },
      {
        title: "Error 404",
        status: "Complete",
        responsible: "Admin Erica",
        description:
          "Al dar enter la pagina se friza y no funciona hasta dar f5",
        type: "Erro de vUi",
        priority: "3",
        creationDate: "12/04/2021",
        finishDate: "12/05/2021",
      },
      {
        title: "Lack of information",
        status: "Canceled",
        responsible: "Admin Angelica",
        description:
          "Al dar enter la pagina se friza y no funciona hasta dar f5",
        type: "Erro de lUi",
        priority: "3",
        creationDate: "12/04/2021",
        finishDate: "12/05/2021",
      },
      {
        title: "No data displayed",
        status: "In Progress",
        responsible: "Admin Carlos",
        description:
          "Al dar enter la pagina se friza y no funciona hasta dar f5",
        type: "Erro de sUi",
        priority: "3",
        creationDate: "12/04/2021",
        finishDate: "11/05/2021",
      },
      {
        title: "Slow load",
        status: "In Progress",
        responsible: "Admin Erica",
        description:
          "Al dar enter la pagina se friza y no funciona hasta dar f5",
        type: "Erro de mUi",
        priority: "3",
        creationDate: "12/04/2021",
        finishDate: "02/05/2022",
      },
      {
        title: "Terrible UI",
        status: "Complete",
        responsible: "Admin Denys",
        description:
          "Al dar enter la pagina se friza y no funciona hasta dar f5",
        type: "Erro de bUi",
        priority: "3",
        creationDate: "10/03/2021",
        finishDate: "11/05/2021",
      },
    ];
    let curUnix = Math.round(
      new Date().getTime() / 1000 - iterations * oneMonthSeconds
    );

    for (let i = 0; i < iterations; i += 1) {
      const randomTicketTemplate =
        ticketTemplates[Math.floor(Math.random() * ticketTemplates.length)];
      const ticket = {
        id: i,
        title: randomTicketTemplate.title,
        status: randomTicketTemplate.status,
        date: "09/01/2020",
        responsible: randomTicketTemplate.responsible,
        paidUntil: randomTicketTemplate.responsible,
        timestamp: curUnix,
        type: randomTicketTemplate.type,
        description: randomTicketTemplate.description,
        priority: randomTicketTemplate.priority,
        creationDate: randomTicketTemplate.creationDate,
        finishDate: randomTicketTemplate.finishDate,
      };
      curUnix += oneMonthSeconds;
      tickets.push(ticket);
    }
    tickets.reverse();
    setTickets(tickets);
  }, [setTickets]);

  const fetchRandomMessages = useCallback(() => {
    shuffle(persons);
    const messages = [];
    const iterations = persons.length;
    const oneDaySeconds = 60 * 60 * 24;
    let curUnix = Math.round(
      new Date().getTime() / 1000 - iterations * oneDaySeconds
    );
    for (let i = 0; i < iterations; i += 1) {
      const person = persons[i];
      const message = {
        id: i,
        src: person.src,
        date: curUnix,
        text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr sed.",
      };
      curUnix += oneDaySeconds;
      messages.push(message);
    }
    messages.reverse();
    setMessages(messages);
  }, [setMessages]);

  const fetchRandomPosts = useCallback(() => {
    shuffle(persons);
    const posts = [];
    const iterations = persons.length;
    const oneDaySeconds = 60 * 60 * 24;
    let curUnix = Math.round(
      new Date().getTime() / 1000 - iterations * oneDaySeconds
    );
    for (let i = 0; i < iterations; i += 1) {
      const person = persons[i];
      const post = {
        id: i,
        src: person.src,
        timestamp: curUnix,
        name: person.name,
      };
      curUnix += oneDaySeconds;
      posts.push(post);
    }
    posts.reverse();
    setPosts(posts);
  }, [setPosts]);

  const toggleAccountActivation = useCallback(() => {
    if (pushMessageToSnackbar) {
      if (isAccountActivated) {
        pushMessageToSnackbar({
          text: "Your account is now deactivated.",
        });
      } else {
        pushMessageToSnackbar({
          text: "Your account is now activated.",
        });
      }
    }
    setIsAccountActivated(!isAccountActivated);
  }, [pushMessageToSnackbar, isAccountActivated, setIsAccountActivated]);

  const selectDashboard = useCallback(() => {
    smoothScrollTop();
    document.title = "WaVer - Dashboard";
    setSelectedTab("Dashboard");
    if (!hasFetchedCardChart) {
      setHasFetchedCardChart(true);
      import("../../shared/components/CardChart").then((Component) => {
        setCardChart(Component.default);
      });
    }
  }, [
    setSelectedTab,
    setCardChart,
    hasFetchedCardChart,
    setHasFetchedCardChart,
  ]);

  const selectPosts = useCallback(() => {
    smoothScrollTop();
    document.title = "WaVer - Posts";
    setSelectedTab("Posts");
    if (!hasFetchedEmojiTextArea) {
      setHasFetchedEmojiTextArea(true);
      import("../../shared/components/EmojiTextArea").then((Component) => {
        setEmojiTextArea(Component.default);
      });
    }
    if (!hasFetchedImageCropper) {
      setHasFetchedImageCropper(true);
      import("../../shared/components/ImageCropper").then((Component) => {
        setImageCropper(Component.default);
      });
    }
    if (!hasFetchedDropzone) {
      setHasFetchedDropzone(true);
      import("../../shared/components/Dropzone").then((Component) => {
        setDropzone(Component.default);
      });
    }
    if (!hasFetchedDateTimePicker) {
      setHasFetchedDateTimePicker(true);
      import("../../shared/components/DateTimePicker").then((Component) => {
        setDateTimePicker(Component.default);
      });
    }
  }, [
    setSelectedTab,
    setEmojiTextArea,
    setImageCropper,
    setDropzone,
    setDateTimePicker,
    hasFetchedEmojiTextArea,
    setHasFetchedEmojiTextArea,
    hasFetchedImageCropper,
    setHasFetchedImageCropper,
    hasFetchedDropzone,
    setHasFetchedDropzone,
    hasFetchedDateTimePicker,
    setHasFetchedDateTimePicker,
  ]);

  const selectSubscription = useCallback(() => {
    smoothScrollTop();
    document.title = "WaVer - Subscription";
    setSelectedTab("Subscription");
  }, [setSelectedTab]);

  const getPushMessageFromChild = useCallback(
    (pushMessage) => {
      setPushMessageToSnackbar(() => pushMessage);
    },
    [setPushMessageToSnackbar]
  );

  const fetchTickets = useCallback(() => {
    const token = localStorage.getItem("app_token");
    if (!token) {
      return;
    }
    getTickets().then((response) => {
      if (response && response.tickets && Array.isArray(response.tickets)) {
        setTickets(response.tickets);
      }
    });
  }, [setTickets]);

  const fetchNotifications = useCallback(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("app_token");
      if (!token) {
        return;
      }
      getNotifications().then((messages) => {
        if (messages && Array.isArray(messages)) {
          setMessages(messages.reverse());
        }
      });
    }, 20000);
    return () => clearInterval(interval);
  }, [setMessages]);

  useEffect(() => {
    const user = localStorage.getItem("current_user");
    const token = localStorage.getItem("app_token");

    if (!user && !token) {
      history.push("");
    }
  });

  const setStatus = useCallback(
    (status) => {
      updateTicketStatus(ticketDetails.ticketID, status).then((r) => {
        if (!r) {
          alert(
            "Ha ocurrido un error. Intente de nuevo luego de unos minutos."
          );
          return;
        }
        setTicketDetails({
          ...ticketDetails,
          status,
        });
        fetchTickets();
      });
    },
    [ticketDetails, fetchTickets]
  );

  const onPaymentSuccess = useCallback(() => {
    fetchTickets();
    pushMessageToSnackbar({
      text: "Se ha creado el Ticket.",
    });
    setIsAddBalanceDialogOpen(false);
  }, [pushMessageToSnackbar, setIsAddBalanceDialogOpen, fetchTickets]);

  useEffect(() => {
    fetchRandomTargets();
    fetchRandomStatistics();
    // fetchRandomTickets();
    // fetchRandomMessages();
    fetchNotifications();
    fetchRandomPosts();
    fetchTickets();
  }, [
    fetchRandomTargets,
    fetchRandomStatistics,
    fetchRandomTickets,
    fetchTickets,
    fetchNotifications,
    fetchRandomMessages,
    fetchRandomPosts,
  ]);

  return (
    <Fragment>
      <LazyLoadAddBalanceDialog
        open={isAddBalanceDialogOpen}
        onClose={closeAddBalanceDialog}
        onSuccess={onPaymentSuccess}
      />
      <LazyLoadTicketDetailDialog
        ticket={ticketDetails}
        open={ticketDetailsOpen}
        setStatus={setStatus}
        onClose={closeTicketDetails}
        onSuccess={() => {
          alert("button touched");
          closeTicketDetails();
        }}
      />
      <NavBar
        selectedTab={selectedTab}
        messages={messages}
        openAddBalanceDialog={openAddBalanceDialog}
      />
      <ConsecutiveSnackbarMessages
        getPushMessageFromChild={getPushMessageFromChild}
      />
      <main className={classNames(classes.main)}>
        <Routing
          isAccountActivated={isAccountActivated}
          ImageCropper={ImageCropper}
          EmojiTextArea={EmojiTextArea}
          CardChart={CardChart}
          Dropzone={Dropzone}
          DateTimePicker={DateTimePicker}
          toggleAccountActivation={toggleAccountActivation}
          pushMessageToSnackbar={pushMessageToSnackbar}
          tickets={tickets}
          statistics={statistics}
          posts={posts}
          targets={targets}
          selectDashboard={selectDashboard}
          selectPosts={selectPosts}
          selectSubscription={selectSubscription}
          openAddBalanceDialog={openAddBalanceDialog}
          openTicketDetails={openTicketDetails}
          setTargets={setTargets}
          setPosts={setPosts}
        />
      </main>
    </Fragment>
  );
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles, { withTheme: true })(memo(Main)));
