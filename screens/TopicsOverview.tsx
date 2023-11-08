import React, { useEffect, useState } from "react"; // Make sure to import React
import { Button, Card, CardProps, H4, H1, Paragraph, View, XStack, ScrollView } from "tamagui";

export function TopicsOverview() {
  const [data, setData] =useState<TopicsCardProps[]>([]);

  useEffect(() => {
    async function fetchData() {
      const dummyData = [
        {
          headline: 'Geografie',
          numberOfLearncards: 5
        },
        {
          headline: 'Biologie',
          numberOfLearncards: 6
        },
        {
          headline: 'Chemie',
          numberOfLearncards: 7
        },
        {
          headline: 'Mathe',
          numberOfLearncards: 8
        },
        {
          headline: 'Informatik',
          numberOfLearncards: 9
        },
        {
          headline: 'Geschichte',
          numberOfLearncards: 10
        },
        {
          headline: 'Englisch',
          numberOfLearncards: 11
        }
      ];
      setData(dummyData);
    }

    fetchData();
  }, []);

  return (
    <ScrollView>
    <H1 size="$9" marginVertical="$3">Deine Learnsets</H1>
    <XStack $sm={{ flexDirection: 'column' }} alignItems="center" space="$3">
      {data.map((topic, index) => (
        <TopicsCard
          key={index}
          animation="bouncy"
          size="$3"
          width={330}
          height={100}
          numberOfLearncards={topic.numberOfLearncards}
          headline={topic.headline}
          padding="$4"
          justifyContent="center"
          onPress={() => {console.log('pressed')}}
        />
      ))}
    </XStack>
    </ScrollView>
  );
}

export interface TopicsCardProps extends CardProps {
  numberOfLearncards: number;
  headline: string;
}

export function TopicsCard(props: TopicsCardProps) {
  return (
    <Card bordered {...props}>
      <H4>{props.headline}</H4>
      <Paragraph theme="alt2">{props.numberOfLearncards} Karteikarten</Paragraph>
    </Card>
  );
}
