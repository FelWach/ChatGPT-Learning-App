import { Card, CardProps, H4, Paragraph } from "tamagui";
import { TopicCardProps } from "./types";

export function TopicsCard({ ...props }: CardProps & TopicCardProps) { // extend CardProps with headline and numberOfLearncards
    return (
        <Card 
        bordered 
        animation="bouncy"
        width="100%"
        padding="$4"
        justifyContent="center"
        {...props}
        >
            <H4>{props.headline}</H4>
            <Paragraph theme="alt2">{props.numberOfLearncards} Karteikarten</Paragraph>
        </Card>
    );
}