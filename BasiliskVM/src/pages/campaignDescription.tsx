import { css } from '@emotion/react'
import { barlowCondensed } from '../styles/fonts'
import AppLayout from '../layouts/AppLayout'
import Button from '../ui/Button'
import Typography from '../ui/Typography'

const CampaignHeaderImg = () => {
  return (
    <div
      css={css`
        background: url('https://res-console.cloudinary.com/dio8wvboq/thumbnails/v1/image/upload/v1675510515/UmVjdGFuZ2xlXzc2XzFfYXNzbWMw/as_is');
        height: 280px;
        position: relative;
        box-shadow: inset 0px -50px 30px -15px #232225;
      `}
    >
      <div
        css={css`
          background: linear-gradient(
            121.09deg,
            rgba(19, 19, 19, 0.376) 30.34%,
            rgba(15, 15, 15, 0.36) 56.43%,
            rgba(20, 20, 20, 0.36) 80.78%,
            rgba(0, 0, 0, 0.36) 103.85%
          );
          border-radius: 6px;
          padding-top: 5px;
          padding-bottom: 5px;
          padding-left: 10px;
          padding-right: 10px;
          display: inline-block;
          margin-top: 147px;
          margin-left: 30px;
        `}
      >
        <Typography variant="h1" color="primary">
          Riardon Struggles
        </Typography>
      </div>
    </div>
  )
}
const DATA = {
  System: 'D&D 5E',
  Frequency: '1 day/week',
  Platforms: 'Roll20, Discord',
  Setting: 'Custom',
  Genres: 'Low fantasy, dark fantasy, realistic, medieval',
  Players: '4/5'
}
const ShortSummary = () => {
  return (
    <div
      css={css`
        background-color: #141414;
        border-radius: 6px;
        display: inline-block;
        padding-top: 10px;
        padding-left: 20px;
        padding-right: 45px;
        padding-bottom: 23px;
        margin-left: 30px;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          gap: 10px;
        `}
      >
        <div
          css={css`
            background: url('https://res-console.cloudinary.com/dio8wvboq/thumbnails/v1/image/upload/v1675512197/dG9rZW5fMV84XzFfd2Q0ZWQ4/as_is');
            height: 35px;
            width: 35px;
            border-radius: 50%;
          `}
        />
        <span
          css={css`
            color: #82db63;
            font-weight: 500;
            font-size: 16px;
          `}
        >
          shakshuka
        </span>
        <span
          css={css`
            color: white;
            &:before {
              content: '\2022';
            }
          `}
        />
        <Typography variant="p" color="text">
          DM since 2019
        </Typography>
      </div>

      <div
        css={css`
          margin-top: 10px;
        `}
      >
        <Typography variant="h3" color="text">
          Details
        </Typography>
        <div>
          <div
            css={css`
              display: flex;
              flex-direction: column;
              margin-top: 10px;
            `}
          >
            <Typography variant="p" color="text">
              System: {DATA.System}
            </Typography>
            <Typography variant="p" color="text">
              Frequency: {DATA.Frequency}
            </Typography>
            <Typography variant="p" color="text">
              Platforms: {DATA.Platforms}
            </Typography>
            <Typography variant="p" color="text">
              Setting: {DATA.Setting}
            </Typography>
            <Typography variant="p" color="text">
              Genres: {DATA.Genres}
            </Typography>
            <Typography variant="p" color="primary">
              Players: {DATA.Players}
            </Typography>
          </div>
        </div>
      </div>

      <div
        css={css`
          margin-top: 10px;
        `}
      >
        <Typography variant="h3" color="text">
          Requirements
        </Typography>
        <ul
          css={css`
            margin-top: 10px;
            padding-left: 20px;
            font-weight: 500;
            line-height: 25px;
          `}
        >
          <li>
            <Typography variant="p" color="text">
              Small questionnaire which describes you as a player
            </Typography>
          </li>
          <li>
            <Typography variant="p" color="text">
              A character with basic background
            </Typography>
          </li>
          <li>
            <Typography variant="p" color="text">
              Microphone
            </Typography>
          </li>
          <li>
            <Typography variant="p" color="text">
              3-4 hours of free time to play
            </Typography>
          </li>
          <li>
            <Typography variant="p" color="text">
              Stable internet connection
            </Typography>
          </li>
        </ul>
      </div>

      <div
        css={css`
          margin-top: 10px;
        `}
      >
        <Typography variant="h3" color="text">
          DM
        </Typography>
        <div
          css={css`
            margin-top: 10px;
          `}
        >
          <Typography variant="p" color="text">
            Hi, I`m shakshuka, I`ve been playing D&D for about 4 years, I`ve
            done a lot of dark/low fantasy sessions. I personally like social
            part of the game, always trying to bring the problem of the lesser
            evil into the gaming world.
          </Typography>
        </div>
      </div>
      <Button
        css={css`
          margin-top: 30px;
        `}
      >
        <Typography variant="subtitle" color="primary">
          REGISTER
        </Typography>
      </Button>
    </div>
  )
}

const GameDescription = () => {
  return (
    <div
      css={css`
        margin-right: 30px;
      `}
    >
      <Typography variant="h3" color="text">
        Description
      </Typography>
      <div
        css={css`
          line-height: 25px;
          margin-top: 10px;
          display: flex;
          flex-direction: column;
          gap: 25px;
        `}
      >
        <Typography variant="p" color="text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Integer
          enim neque volutpat ac tincidunt. Cum sociis natoque penatibus et
          magnis. Semper risus in hendrerit gravida rutrum quisque non tellus
          orci. Egestas sed sed risus pretium quam vulputate dignissim. Integer
          malesuada nunc vel risus commodo viverra. Dolor magna eget est lorem.
          Eget nunc scelerisque viverra mauris in aliquam sem fringilla ut. Urna
          porttitor rhoncus dolor purus non enim praesent elementum. Ac turpis
          egestas sed tempus. Est placerat in egestas erat imperdiet.
        </Typography>
        <Typography variant="p" color="text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Integer
          enim neque volutpat ac tincidunt. Cum sociis natoque penatibus et
          magnis. Semper risus in hendrerit gravida rutrum quisque non tellus
          orci. Egestas sed sed risus pretium quam vulputate dignissim. Integer
          malesuada nunc vel risus commodo viverra. Dolor magna eget est lorem.
          Eget nunc scelerisque viverra mauris in aliquam sem fringilla ut. Urna
          porttitor rhoncus dolor purus non enim praesent elementum. Ac turpis
          egestas sed tempus. Est placerat in egestas erat imperdiet.
        </Typography>
        <Typography variant="p" color="text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Integer
          enim neque volutpat ac tincidunt. Cum sociis natoque penatibus et
          magnis. Semper risus in hendrerit gravida rutrum quisque non tellus
          orci. Egestas sed sed risus pretium quam vulputate dignissim. Integer
          malesuada nunc vel risus commodo viverra. Dolor magna eget est lorem.
          Eget nunc scelerisque viverra mauris in aliquam sem fringilla ut. Urna
          porttitor rhoncus dolor purus non enim praesent elementum. Ac turpis
          egestas sed tempus. Est placerat in egestas erat imperdiet.
        </Typography>
        <Typography variant="p" color="text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Integer
          enim neque volutpat ac tincidunt. Cum sociis natoque penatibus et
          magnis. Semper risus in hendrerit gravida rutrum quisque non tellus
          orci. Egestas sed sed risus pretium quam vulputate dignissim. Integer
          malesuada nunc vel risus commodo viverra. Dolor magna eget est lorem.
          Eget nunc scelerisque viverra mauris in aliquam sem fringilla ut. Urna
          porttitor rhoncus dolor purus non enim praesent elementum. Ac turpis
          egestas sed tempus. Est placerat in egestas erat imperdiet.
        </Typography>
      </div>
    </div>
  )
}

const CampaignDescription = () => {
  return (
    <AppLayout>
      <div
        css={css`
          background-color: #232225;
          color: #cecece;
          font-family: ${barlowCondensed.style.fontFamily};
          padding-top: 64px;
          padding-left: 326px;
        `}
      >
        <CampaignHeaderImg />
        <div
          css={css`
            display: flex;
            gap: 30px;
          `}
        >
          <div
            css={css`
              height: 596px;
              overflow-y: scroll;
            `}
          >
            <ShortSummary />
          </div>
          <GameDescription />
        </div>
      </div>
    </AppLayout>
  )
}

export default CampaignDescription
