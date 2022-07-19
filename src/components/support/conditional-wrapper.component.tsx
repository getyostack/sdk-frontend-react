import React from 'react';

interface Props {
    condition: any;
    wrapper: Function;
    children?: any;
}

export const ConditionalWrapper: React.FunctionComponent<Props> = (props) => {

    if (!props.condition) {
        return (
            <React.Fragment>
                {props.children}
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            {props.wrapper(props.children)}
        </React.Fragment>
    );
}