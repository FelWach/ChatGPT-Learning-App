import { Card, CardProps, H4, Paragraph } from "tamagui";

export function TopicsCard({ ...props }: CardProps & { headline: string; numberOfLearncards: number }) { // extend CardProps with headline and numberOfLearncards
    return (
        <Card bordered {...props}>
            <H4>{props.headline}</H4>
            <Paragraph theme="alt2">{props.numberOfLearncards} Karteikarten</Paragraph>
        </Card>
    );
}