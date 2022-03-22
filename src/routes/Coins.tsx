import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import Icon from "react-crypto-icons";

////
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";


interface ICoin {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
}

const Container = styled.div`
    padding: 0px 20px;
`;

const Loader = styled.span`
    text-align: center;
    display: block;
`;

const Header = styled.header`
    height: 15vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
    background-color: white;
    color: ${(props) => props.theme.bgColor};
    border-radius: 15px;
    margin-bottom: 10px;
    a {
        display: flex;
        align-items: center;
        padding: 20px;
        transition: color 0.2s ease-in;
        /* display: block; */
    }
    &:hover {
        a {
            color: ${(props) => props.theme.accentColor};
        }
    }
`;

const Title = styled.h1`
    font-size: 48px;
    color: ${(props) => props.theme.accentColor};
`;

const CoinIcon = styled.div`
    margin-right: 10px;
`;

function Coins() {
    //// 2
    const setDarkAtom = useSetRecoilState(isDarkAtom);
    const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
    
    const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);

    console.log("data : ", data);

    return (
        <Container>
            <Helmet>
                <title>코인</title>
            </Helmet>
            <Header>
                <Title>코인</Title>
                {/* //// 1 */}
                <button onClick={toggleDarkAtom}>Toggle Mode</button>
            </Header>
            <CoinsList>
                {isLoading ? (
                    <Loader>Loading...</Loader>
                ) : (
                    <CoinsList>
                        {data?.slice(0, 100).map((coin) => (
                            <Coin key={coin.id}>
                                <Link
                                    to={{
                                        pathname: `/${coin.id}`,
                                        state: { name: coin.name },
                                    }}
                                >
                                    <Icon
                                        name={coin.symbol.toLowerCase()}
                                        size={26}
                                    />
                                    &nbsp;&nbsp;
                                    {coin.name} &rarr;
                                </Link>
                            </Coin>
                        ))}
                    </CoinsList>
                )}
            </CoinsList>
        </Container>
    );
}
export default Coins;
