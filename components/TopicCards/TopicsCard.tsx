import { Card, CardProps, H4, Paragraph } from "tamagui";
import { TopicCardProps } from "./types";

export function TopicsCard({ ...props }: CardProps & TopicCardProps) { // extend CardProps with headline and numberOfLearncards
    return (
        <Card bordered {...props}>
            <H4>{props.headline}</H4>
            <Paragraph theme="alt2">{props.numberOfLearncards} Karteikarten</Paragraph>
        </Card>
    );
}