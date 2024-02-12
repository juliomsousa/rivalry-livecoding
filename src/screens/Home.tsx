import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const Home = () => {
  const navigation = useNavigation();

  const [bets, setBets] = useState<any>([]);
  const [pendingBets, setPendingBets] = useState<any>([]);

  const handleButtonPress = (bet: any) => {
    const storedBet = pendingBets.find((b: any) => b.id === bet.id);

    if (storedBet) {
      removeBet(storedBet);
    } else {
      addBet(bet);
    }
  };

  const addBet = (bet: any) => {
    setPendingBets((prev: any) => [...prev, bet]);
    console.log(pendingBets);
  };

  const removeBet = (bet: any) => {
    setPendingBets((prev: any) => prev.filter((b: any) => b.id !== bet.id));
  };

  const isBetSelected = (bet: any) => {
    return pendingBets.find((b: any) => b.id === bet.id);
  };

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/paction/markets/main/markets.json')
      .then((response) => response.json())
      .then((json) => {
        console.log(json.markets[0]);
        setBets(json.markets);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>{'Pending bets:' + pendingBets.length}</Text>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('PendingBets', { bets: pendingBets });
          }}
        >
          <Text>See bets</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={bets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View>
              <Text>{item.tournament}</Text>
              <Text>{item.updated_at}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  {
                    backgroundColor: isBetSelected(item.outcomes[0])
                      ? 'green'
                      : '#ddd',
                  },
                ]}
                onPress={() => handleButtonPress(item.outcomes[0])}
              >
                <Text>{item.outcomes[0].name}</Text>
                <Text>{item.outcomes[0].odds}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  {
                    backgroundColor: isBetSelected(item.outcomes[1])
                      ? 'green'
                      : '#ddd',
                  },
                ]}
                onPress={() => handleButtonPress(item.outcomes[1])}
              >
                <Text>{item.outcomes[1].name}</Text>
                <Text>{item.outcomes[1].odds}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  actions: {
    borderTopWidth: 1,
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    padding: 5,
    backgroundColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 64,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});
