import { useEffect, useState } from "react";
import "./styles.css";
import {
  ChakraProvider,
  Button,
  Heading,
  Stack,
  Box,
  SimpleGrid,
  Text,
  Switch,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import Countdown from "react-countdown";

const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

const CageLetters = () => {
  const [letter, setLetter] = useState(letters[Math.floor(Math.random() * 8)]);
  const [attempts, setAttempts] = useState(0);
  const [bestAttempts, setBestAttempts] = useState(0);

  const isOdd = (letter.charCodeAt(0) - 96) % 2;

  useEffect(() => {
    setBestAttempts((n) => (attempts > n ? attempts : n));
  }, [attempts]);

  const clickHandler = (type: number) => () => {
    const isWin = type === isOdd;
    setAttempts((n) => (isWin ? n + 1 : 0));
    setLetter(letters[Math.floor(Math.random() * 8)]);
  };

  return (
    <Stack>
      <Box background="green.200" padding={2} borderRadius="lg">
        We start by identifying whether a letter is considered odd or even.
        Remember CAGE letters are Odd, the rest are Even.
      </Box>
      <Box>
        Wins: {attempts} (Best: {bestAttempts})
      </Box>
      <Heading fontSize="5xl">{letter.toLowerCase()}</Heading>
      <Stack direction="row" spacing={4} justifyContent="center">
        <Button onClick={clickHandler(1)}>Odd</Button>
        <Button onClick={clickHandler(0)}>Even</Button>
      </Stack>
    </Stack>
  );
};

const Timer = () => {
  return (
    <Countdown
      date={Date.now() + 60000}
      intervalDelay={0}
      precision={3}
      renderer={(props) => {
        console.log({ props });
        return (
          <div>
            {props.seconds}:{props.milliseconds.toString().slice(0, 2)}
          </div>
        );
      }}
    />
  );
};

const CageLettersAndNumbers = () => {
  const [letter, setLetter] = useState(letters[Math.floor(Math.random() * 8)]);
  const [number, setNumber] = useState(numbers[Math.floor(Math.random() * 8)]);
  const [attempts, setAttempts] = useState(0);
  const [timed, setTimed] = useState(false);

  const isLetterOdd = (letter.charCodeAt(0) - 96) % 2;
  const isNumberOdd = number % 2;

  const answer = isLetterOdd === isNumberOdd ? 1 : 0;

  const clickHandler = (type: number) => () => {
    setAttempts((n) => {
      if (type === answer) {
        return n + 1;
      } else {
        return 0;
      }
    });

    setLetter(letters[Math.floor(Math.random() * 8)]);
    setNumber(numbers[Math.floor(Math.random() * 8)]);
  };

  return (
    <Stack>
      <Stack direction="row">
        <Box>Casual</Box>
        <Switch
          isChecked={timed}
          onChange={(e) => setTimed(e.target.checked)}
          isDisabled
        />
        <Box>Timed (Coming soon)</Box>
      </Stack>
      {/* <Timer /> */}
      <Box background="green.200" padding={2} borderRadius="lg">
        Now we move onto letter-number combos.{" "}
      </Box>
      <Box>Wins: {attempts}</Box>
      <Heading fontSize="5xl">
        {letter.toLowerCase()}
        {number}
      </Heading>
      <Stack direction="row" spacing={4} justifyContent="center">
        <Button onClick={clickHandler(1)}>Dark</Button>
        <Button onClick={clickHandler(0)}>Light</Button>
      </Stack>
      {timed ? <Button>Start</Button> : null}
    </Stack>
  );
};

const Game = ({ children }: any) => {
  return (
    <Box padding={4} background="green.400" borderRadius="lg">
      {children}
    </Box>
  );
};

const Square = ({ bg, children }: any) => {
  return (
    <Stack
      background={bg}
      alignItems="center"
      justifyContent="center"
      width="150px"
      height="150px"
    >
      <Box>{children}</Box>
    </Stack>
  );
};

const Method = () => {
  return (
    <Stack alignItems="center" spacing={4}>
      <Heading as="h2">The purpose</Heading>
      <Stack textAlign="left">
        <Text>
          This method helps us to quickly identify whether a given square, such
          as h7, is a light or dark square. It does this without using
          visualisation so that people who struggle to visualise can still
          determine a square's colour.
        </Text>
        <Text>
          A high goal of this method is to improve our overall internal
          representation and intuition of the board, either visual or
          non-visual.
        </Text>
      </Stack>
      <Heading as="h2">The method</Heading>
      <Stack textAlign="left">
        <Text>
          A chess board is made up of ranks and files. The ranks are labeled
          from a-h and the files are numbered 1-8. This is the basis for the
          coordinate system on a chess board.
        </Text>
        <Text>
          In this method the rank letters c,a,g, and e (CAGE) are all considered
          Odd. All other letters are considered Even.
        </Text>
        <Text>
          When you combine a rank letter with a file number, you can produce an
          Odd-Even combo.
        </Text>
        <Text>
          For example the square h3 is considered Even-Odd because h is not in
          CAGE, and 3 is an odd number.
        </Text>
        <Text>
          We know from the diagram below that Even-Odd squares are always Light
          coloured squares on the chess board.
        </Text>
        <Text>
          One way I like to think about this is that if the combination of
          Odd-Even is the same on both sides of the dash such as Even-Even or
          Odd-Odd, then the square is always Dark, otherwise its Light.
        </Text>
      </Stack>
      <SimpleGrid columns={2} columnGap={0} width="300px">
        <Square bg="blue.500">Odd-Odd</Square>
        <Square bg="yellow.100">Odd-Even</Square>
        <Square bg="yellow.100">Even-Odd</Square>
        <Square bg="blue.500">Even-Even</Square>
      </SimpleGrid>
    </Stack>
  );
};

const Diagonals = () => {
  const [letter, setLetter] = useState(letters[Math.floor(Math.random() * 8)]);
  const [number, setNumber] = useState(numbers[Math.floor(Math.random() * 8)]);
  const [attempts, setAttempts] = useState(0);

  const nextLetter = letters.filter((l) => l !== letter)[
    Math.floor(Math.random() * 7)
  ];

  const findNextNumber = () => {
    const letterNumber = letter.charCodeAt(0) - 96;
    const nextLetterNumber = nextLetter.charCodeAt(0) - 96;
    const x = Math.abs(letterNumber - nextLetterNumber);
    const diagonals = numbers.filter((n) => {
      return Math.abs(n - number) === x;
    });

    const nonDiagonals = numbers.filter((n) => {
      return Math.abs(n - number) !== x;
    });

    const isDiagonal = !!Math.round(Math.random());

    const numberRange =
      isDiagonal && diagonals.length ? diagonals : nonDiagonals;

    return {
      isDiagonal,
      number: numberRange[Math.floor(Math.random() * numberRange.length)],
    };
  };

  const nextNumber = findNextNumber();

  const clickHandler = (answer: boolean) => {
    const { isDiagonal } = nextNumber;
    setAttempts((n) => (isDiagonal === answer ? n + 1 : 0));
    setLetter(letters[Math.floor(Math.random() * 8)]);
    setNumber(numbers[Math.floor(Math.random() * 8)]);
  };

  return (
    <Stack>
      <Box background="green.200" padding={2} borderRadius="lg">
        Are these 2 squares on the same diagonal?
      </Box>
      <Stack>
        <Text>Wins: {attempts}</Text>
        <Heading fontSize="5xl">
          {letter.toLowerCase()}
          {number} - {nextLetter.toLowerCase()}
          {nextNumber.number}
        </Heading>

        <Stack direction="row" spacing={4} justifyContent="center">
          <Button
            onClick={() => {
              clickHandler(true);
            }}
          >
            Yes
          </Button>
          <Button
            onClick={() => {
              clickHandler(false);
            }}
          >
            No
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Stack alignItems="center" padding={4} paddingBottom="100px">
          <Stack spacing={8} maxWidth="1200px" alignItems="center">
            <Heading>Chess training tools</Heading>

            <Heading as="h2">CAGE</Heading>
            <Box>
              <Method />
            </Box>

            <Box>
              <Heading as="h4">Leaderboard</Heading>
              <Box>#1 MrTeacherman</Box>
            </Box>

            <Tabs width="100%">
              <TabList>
                <Tab>Letters</Tab>
                <Tab>Letters & Numbers</Tab>
                <Tab>Diagonals</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <Game>
                    <CageLetters />
                  </Game>
                </TabPanel>
                <TabPanel>
                  <Game>
                    <CageLettersAndNumbers />
                  </Game>
                </TabPanel>
                <TabPanel>
                  <Game>
                    <Diagonals />
                  </Game>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Stack>
        </Stack>
      </div>
    </ChakraProvider>
  );
}
