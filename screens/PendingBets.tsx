import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';

export const PendingBets = () => {
  const route = useRoute();

  const bets = route.params?.bets || [];

  const EmptyBet = () => {
    return (
      <View style={styles.noBets}>
        <Text>No bets</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={bets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View>
              <Text>{item.name}</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={EmptyBet}
        contentContainerStyle={{ flex: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  noBets: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
